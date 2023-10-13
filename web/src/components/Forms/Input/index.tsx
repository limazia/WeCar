import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export function Input({ className, ...rest }: InputProps) {
  return <input className={`form-control ${className}`} {...rest} />;
}
