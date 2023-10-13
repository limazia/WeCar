import { formatCurrency } from "./format";

export const maskMoney = (value: string): string => {
  const numericValue = value.replace(/[^\d]/g, "");

  const formattedValue = formatCurrency(parseFloat(numericValue) / 100);

  return formattedValue;
};

export const maskPhone = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d{4})(\d)/, "$1-$2");
};
