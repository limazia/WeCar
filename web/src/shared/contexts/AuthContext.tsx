import { ReactNode, createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { UserService } from "@shared/services/UserService";
import { Account } from "@shared/interfaces";
import { api } from "@shared/axios/apiClient";
import { useCookie } from "@shared/hooks/useCookies";

type AuthContextData = {
  user: Account | undefined;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
};

type LoginCredentials = {
  email: string;
  password: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();

  const { getCookie, setCookie, removeCookie } = useCookie("@wecar.token");

  const [user, setUser] = useState<Account>();
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = !!user;

  useEffect(() => {
    loadAccount();

    window.addEventListener("refresh-account", () => loadAccount());

    return () => {
      window.removeEventListener("refresh-account", () => loadAccount());
    };
  }, []);

  async function loadAccount() {
    const token = getCookie;

    if (token) {
      try {
        const response = await UserService.account();

        if (response) {
          setUser(response);

          const permissions = response?.permissions;

          const hasLoginAdminPermission =
            permissions &&
            (permissions.includes("admin") ||
              permissions.some((permission: string) =>
                ["dashboard"].includes(permission)
              ));

          if (!hasLoginAdminPermission) {
            toast.error(
              "Você não tem permissão para acessar o painel administrativo."
            );

            logout();
            navigate("/admin/");
          }
        }
      } catch (ex) {
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }

  async function login({ email, password }: LoginCredentials) {
    const response = await api.post("/api/auth/login", {
      email,
      password,
    });
    const { token } = response.data;

    if (token) {
      setCookie(token, {
        maxAge: 60 * 60 * 25 * 7, // 7 days
        path: "/",
      });

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      window.location.replace("/admin/");
    }
  }

  function logout() {
    removeCookie({ path: "/" });
    removeCookie({ path: "/" });

    setUser(undefined);

    navigate("/admin");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
