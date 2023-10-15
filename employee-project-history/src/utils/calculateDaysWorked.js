export const calculateDaysWorked = (startDate, endDate) => {
    const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.round(Math.abs((end - start) / oneDay));
  };