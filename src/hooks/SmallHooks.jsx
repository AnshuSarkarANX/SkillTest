export function formatDate(dateStr) {
  const isValidFormat = /^\d{4}-\d{2}-\d{2}$/.test(dateStr);

  if (!isValidFormat) {
    return "Invalid date format";
  }

  const [year, month, day] = dateStr.split("-");
  const date = new Date(dateStr);

  if (
    date.getFullYear() !== Number(year) ||
    date.getMonth() + 1 !== Number(month) ||
    date.getDate() !== Number(day)
  ) {
    return "Invalid date format";
  }

  return `${day}/${month}/${year}`;
}