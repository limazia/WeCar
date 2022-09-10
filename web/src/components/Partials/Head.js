import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function Head({ title, description }) {
  const location = useLocation();

  useEffect(() => {
    title
      ? (document.title = `${process.env.REACT_APP_NAME} - ${title}`)
      : (document.title = process.env.REACT_APP_NAME);

    if (description) {
      document
        .querySelector('meta[name="description"]')
        .setAttribute("content", description);
    }
  }, [location, title, description]);

  return <></>;
}