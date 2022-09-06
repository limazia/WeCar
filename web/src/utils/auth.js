import Cookies from "universal-cookie";

export const cookies = new Cookies();

export const TOKEN_KEY = "wecar.token";
export const REFRESH_KEY = "wecar.refresh";

export const createToken = (token, refreshToken) => {
  cookies.set(TOKEN_KEY, token);
  cookies.set(REFRESH_KEY, refreshToken);
};
export const removeToken = () => {
  cookies.remove(TOKEN_KEY);
  cookies.remove(REFRESH_KEY);
};
export const getToken = () => cookies.get(TOKEN_KEY);
export const getRefreshToken = () => cookies.get(REFRESH_KEY);
export const isAuthenticated = () => getToken() !== null;
export const logout = () => removeToken();
