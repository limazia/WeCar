import { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export function Textarea({ className = "", ...rest }: TextareaProps) {
  return <textarea className={`form-control ${className}`.trim()} {...rest} />;
}
