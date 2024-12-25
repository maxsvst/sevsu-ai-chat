export const dateToHH_MM = (value: string) => {
  const date = new Date(value);
  const splittedDate = date.toTimeString().split(" ")[0];
  const hh_MM = splittedDate.substring(0, 5);
  return hh_MM;
};
