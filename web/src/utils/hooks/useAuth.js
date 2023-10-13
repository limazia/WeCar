import { useContext } from "react";
import { AuthContext } from "~/utils/context/AuthContext";

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth precisa ser usado dentro do WrappedApp");
  }

  return context;
};

export default useAuth;