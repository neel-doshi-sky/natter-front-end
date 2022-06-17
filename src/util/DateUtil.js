export const printDate = (dateSupplied) => {
  const today = new Date();
  const date = new Date(dateSupplied);
  date.setSeconds(0, 0);
  if (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear() &&
    date.getHours() === today.getHours() &&
    date.getMinutes() === today.getMinutes() &&
    date.getSeconds() < 5
  ) {
    return "A few moments ago";
  } else if (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  ) {
    return "Today at " + date.toLocaleTimeString().replace(/:[^:]*$/, "");
  } else if (
    date.getDate() === today.getDate() - 1 &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  ) {
    return "Yesterday at " + date.toLocaleTimeString().replace(/:[^:]*$/, "");
  }

  return (
    date.toLocaleDateString() +
    " at " +
    date.toLocaleTimeString().replace(/:[^:]*$/, "")
  );
};
