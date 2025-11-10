export const DateFormatter = date => {
  let dataObj = new Date(date);
  const formattedDate = new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dataObj);
  return formattedDate;
};
