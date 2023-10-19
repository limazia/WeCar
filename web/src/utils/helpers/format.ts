export const formatDateAt = (dateAt: string) => {
  const [date, time] = dateAt.split(",", 4);

  return `${date}, ${time}`;
};

export const formatCurrency = (value: number): string => {
  const formattedValue = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(value);

  return formattedValue;
};

export const formatKM = (value: number): string => {
  const formattedValue = value.toLocaleString("pt-BR", {
    maximumFractionDigits: 2,
  });

  return formattedValue;
};


export function wasWeeksAgo(date: string | undefined): boolean {
  if (date === undefined) {
    return false;
  }

  // Reformatando a string de data para o formato "MM/DD/YYYY"
  const formattedDate = date.split("/").reverse().join("-");

  const createdAtDate = new Date(formattedDate);
  const currentDate = new Date();

  const differenceInMilliseconds = currentDate.getTime() - createdAtDate.getTime();
  const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

  return differenceInDays < 5;
}
