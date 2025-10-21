export function formatDate(dateStr, format = "y", separator = "-") {
  const formatYMD = /^\d{4}-\d{2}-\d{2}$/;

  let year, month, day;

  // Parse input date
  if (formatYMD.test(dateStr)) {
    // Simple format: YYYY-MM-DD
    [year, month, day] = dateStr.split("-");
  } else if (dateStr.includes("T")) {
    // ISO format with time component
    const datePart = dateStr.split("T")[0];
    if (/^\d{4}-\d{2}-\d{2}$/.test(datePart)) {
      [year, month, day] = datePart.split("-");
    } else {
      return "Invalid date format";
    }
  } else {
    return "Invalid date format";
  }

  // Validate the date
  const date = new Date(`${year}-${month}-${day}`);

  if (
    date.getFullYear() !== Number(year) ||
    date.getMonth() + 1 !== Number(month) ||
    date.getDate() !== Number(day)
  ) {
    return "Invalid date format";
  }

  // Format output based on format type
  switch (format) {
    case "raw":
      // Return original string as-is
      return dateStr;

    case "y":
      // YYYY/MM/DD or YYYY-MM-DD
      return `${year}${separator}${month}${separator}${day}`;

    case "d":
      // DD/MM/YYYY or DD-MM-YYYY
      return `${day}${separator}${month}${separator}${year}`;

    default:
      return "Invalid format option";
  }
}
