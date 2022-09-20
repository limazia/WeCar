import Cookies from "universal-cookie";

export const cookies = new Cookies();

export const TOKEN_KEY = "token";
export const REFRESH_KEY = "refresh";

export const createToken = (token, refreshToken) => {
  cookies.set(TOKEN_KEY, token, { path: "/" });
  cookies.set(REFRESH_KEY, refreshToken, { path: "/" });
};
export const removeToken = () => {
  cookies.remove(TOKEN_KEY, { path: "/" });
  cookies.remove(REFRESH_KEY, { path: "/" });
};
export const getToken = () => cookies.get(TOKEN_KEY);
export const getRefreshToken = () => cookies.get(REFRESH_KEY);
export const isAuthenticated = () => getToken() !== null;
export const logout = () => removeToken();
