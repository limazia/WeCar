import { ReactNode, createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { UserService } from "@utils/services/UserService";
import { Account } from "@utils/interfaces";
import { api } from "@utils/axios/apiClient";
import { useCookie } from "@utils/hooks/useCookies";

interface AuthContextData {
  user: Account | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginProps) => Promise<LoginResponse>;
  logout: () => void;
}

interface LoginProps {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  error: string | null;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const { getCookie, setCookie, removeCookie } = useCookie("@wecar.token");

  const [user, setUser] = useState<Account | null>(null);
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
        const data = await UserService.account();
        const response = Array.isArray(data) ? data[0] : data;

        if (response) {
          setUser(response);

          const permissions = response?.group?.permissions;

          const hasLoginAdminPermission =
            permissions &&
            (permissions.includes("admin") ||
              permissions.some((permission: string) => ["dashboard"].includes(permission)));

          if (!hasLoginAdminPermission) {
            toast.error("Você não tem permissão para acessar o painel administrativo.");

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

  async function login({ email, password }: LoginProps) {
    const response = await api.post("/api/auth/login", {
      email,
      password,
    });
    const { token, error } = response.data;

    if (token) {
      setCookie(token, {
        maxAge: 60 * 60 * 25 * 7, // 7 days
        path: "/",
      });

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      window.location.replace("/admin/");
    }

    return {
      token,
      error,
    };
  }

  function logout() {
    removeCookie({ path: "/" });
    setUser(null);

    navigate("/admin");
  }

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
