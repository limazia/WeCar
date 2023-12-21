import { ReactNode, ComponentProps } from "react";

interface ButtonProps extends ComponentProps<"button"> {
  children: ReactNode;
  className?: string;
}

export function Button({
  children,
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <button className={className} {...rest}>
      {children}
    </button>
  );
}
