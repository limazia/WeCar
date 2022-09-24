import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";

import api from "~/utils/services/api";
import { getProfile } from "~/utils/services/api";
import { getToken, createToken } from "~/utils/services/auth";

const controller = new AbortController();

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const cookies = new Cookies();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = getToken();

    if (token) {
      getProfile()
        .then((data) => {
          console.log(data);
          setUser(data);
          const { permissions } = data;

          if (
            !permissions.some(
              (perm) => ["admin", "login_admin"].indexOf(perm) >= 0
            )
          ) {
            alert("sem o osadisa");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    return () => {
      controller.abort();
    };
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (email && password) {
      setLoading(true);

      try {
        const { data } = await api.post("/api/auth/login", { email, password });
        const { token, refreshToken, error, message } = data;

        if (token) {
          setEmail("");
          setPassword("");
          setLoading(false);

          createToken(token, refreshToken);

          api.defaults.headers["Authorization"] = `Bearer ${token}`;

          window.location.replace("/admin/");
        } else {
          if (message) {
            toast.success(message);
          } else {
            toast.error(error);
            setLoading(false);
            setPassword("");
          }
        }
      } catch (ex) {
        toast.error("Houve um problema com o servidor!");
        setLoading(false);
      }
    } else {
      toast.error("Preencha email e senha para continuar!");
    }
  }

  function logout() {
    cookies.remove("token", { path: "/" });
    cookies.remove("refresh", { path: "/" });
    setUser(null);

    window.location.replace("/admin/login");
  }

  const value = {
    handleSubmit,
    email,
    password,
    user,
    authenticated: !!user,
    setEmail,
    setPassword,
    setUser,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
