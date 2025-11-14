export const DateFormatter = date => {
  if (!date) return 'N/A';

  const dataObj = new Date(date);

  if (isNaN(dataObj.getTime())) return 'N/A';
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dataObj);
};
