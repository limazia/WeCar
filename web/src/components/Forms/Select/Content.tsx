import { ReactNode, SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode;
  className?: string;
}

export function Content({ className = "", children, ...rest }: SelectProps) {
  return <select className={`form-control ${className}`} {...rest}>{children}</select>;
}
