import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

interface UseCookieResult {
  getCookie: string | undefined;
  setCookie: (value: string, options?: object) => void;
  removeCookie: (options?: object) => void;
}

export const useCookie = (cookieName: string): UseCookieResult => {
  const cookies = new Cookies();

  const [getCookie, setGetCookie] = useState<string | undefined>(
    cookies.get(cookieName)
  );

  useEffect(() => {
    setGetCookie(cookies.get(cookieName));
  }, [cookieName, cookies]);

  const setCookie = (value: string, options?: object): void => {
    cookies.set(cookieName, value, options);
    setGetCookie(value);
  };

  const removeCookie = (options?: object): void => {
    cookies.remove(cookieName, options);
    setGetCookie(undefined);
  };

  return { getCookie, setCookie, removeCookie };
};
