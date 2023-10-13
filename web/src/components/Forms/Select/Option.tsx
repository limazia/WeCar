import { OptionHTMLAttributes, ReactNode } from "react";

interface SelectProps extends OptionHTMLAttributes<HTMLOptionElement> {
  children: ReactNode;
}

export function Option({ children, ...rest }: SelectProps) {
  return <option {...rest}>{children}</option>;
}
