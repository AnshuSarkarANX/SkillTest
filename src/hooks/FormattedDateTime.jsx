// Helper: Add ordinal suffix to day
function getOrdinal(day) {
  if (day > 3 && day < 21) return day + "th";
  switch (day % 10) {
    case 1:
      return day + "st";
    case 2:
      return day + "nd";
    case 3:
      return day + "rd";
    default:
      return day + "th";
  }
}

function formatDateTime(dateTimeString) {
  if (!dateTimeString) return "";

  // Convert datetime string "YYYY-MM-DD HH:mm:ss" to Date object
  const [datePart, timePart] = dateTimeString.split(" ");
  const date = new Date(`${datePart}T${timePart}`);

  if (isNaN(date)) return "";

  // Format day with ordinal
  const day = getOrdinal(date.getDate());

  // Month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[date.getMonth()];

  // Format time hh:mm in 24h format
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const time = `${hours}:${minutes}`;

  // Get current year
  const currentYear = new Date().getFullYear();

  // Conditionally include year if not current year
  const yearPart =
    date.getFullYear() !== currentYear ? ` ${date.getFullYear()}` : "";

  return `${day} ${month}${yearPart} on ${time}`;
}

export default formatDateTime;
