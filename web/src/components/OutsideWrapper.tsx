import { useRef, useEffect, ReactNode } from "react";

interface OutsideWrapperProps {
  children: ReactNode;
  onClickOutside: () => void;
}

export function OutsideWrapper({
  children,
  onClickOutside,
}: OutsideWrapperProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        onClickOutside();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClickOutside]);

  return <div ref={wrapperRef}>{children}</div>;
}
