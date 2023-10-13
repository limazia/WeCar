import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface HeadProps {
  title?: string;
}

export function Head({ title }: HeadProps) {
  const location = useLocation();

  useEffect(() => {
    const defaultTitle = import.meta.env.VITE_APP_NAME || "WeCar";
    const fullTitle = title ? `${defaultTitle} - ${title}` : defaultTitle;

    document.title = fullTitle;

    return () => {
      document.title = import.meta.env.VITE_APP_NAME || "WeCar";
    };
  }, [title, location]);

  return null;
}
