import * as dateFns from "date-fns";

export const parseDate = (dateString, formats) => {
  for (const format of formats) {
    const date = dateFns.parse(dateString, format, new Date());
    if (dateFns.isValid(date)) {
      return date;
    }
  }
  return null; // Handle invalid dates
};
