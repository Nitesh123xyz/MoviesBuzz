export const DateFormatter = date => {
  if (!date) return 'N/A';

  const dataObj = new Date(date);

  if (isNaN(dataObj.getTime())) return 'N/A';
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    // month: 'long',
    // day: 'numeric',
  }).format(dataObj);
};

export const TimerFormatter = minutes => {
  if (minutes === null || minutes === undefined) return 'N/A';
  if (isNaN(minutes)) return 'N/A';

  const mins = Number(minutes);

  const hours = Math.floor(mins / 60);
  const remainingMins = mins % 60;

  if (hours === 0) return `${remainingMins}m`;
  if (remainingMins === 0) return `${hours}h`;

  return `${hours}h ${remainingMins}m`;
};
