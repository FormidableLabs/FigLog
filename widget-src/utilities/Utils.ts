// Description: This file contains utility functions that are used throughout the widget.

// returns a random id, generally used as id for a changelog entry
export const randomId = () => Math.random().toString(36).substring(2, 15);

// accepts an epoch timestamp and a date, time, or datetime formatting type
// date - returns the provided epoch timestamp in the format of MM/DD/YYYY
// time - returns the provided epoch timestamp in the format of 00:00:00 AM/PM
// datetime - returns the provided epoch timestamp in the format of MM/DD/YYYY @ 00:00:00 AM/PM
export const formatDate = (epoch: number, format: 'date' | 'time' | 'datetime') => {
  let formattedDate: string = '';

  switch (format) {
    case 'date':
      const dateDate = new Date(epoch);
      const monthDate = dateDate.getMonth() + 1;
      const yearDate = dateDate.getFullYear();
      const dayDate = dateDate.getDate();
      formattedDate = `${monthDate}|${dayDate}|${yearDate}`;
      break;

    case 'time':
      const dateTime = new Date(epoch);
      formattedDate = dateTime.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      break;

    case 'datetime':
      const dateobj = new Date(epoch);
      const monthDateTime = dateobj.getMonth() + 1;
      const yearDateTime = dateobj.getFullYear();
      const dayDateTime = dateobj.getDate();
      const timeDateTime = dateobj.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      formattedDate = `${monthDateTime}|${dayDateTime}|${yearDateTime} @ ${timeDateTime}`;
      break;

    default:
      formattedDate = '';
      break;
  }

  return formattedDate;
};
