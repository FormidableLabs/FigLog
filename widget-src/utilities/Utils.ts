// Description: This file contains utility functions that are used throughout the widget.

// returns a random id, generally used as id for a changelog entry
export const randomId = () => Math.random().toString(36).substring(2, 15);

// accepts an epoch timestamp and a format ('date', 'time', or 'datetime')
export const formatDate = (epoch: number, format: 'date' | 'time' | 'datetime') => {
  const date: Date = new Date(epoch);
  let formattedDate: string = '';
  let month: number | string = 0;
  let year: number | string = 0;
  let yearFull: number | string = 0;
  let day: number | string = 0;
  let hours: number | string = 0;
  let minutes: number | string = 0;
  let seconds: number | string = 0;
  let ampm: string = '';

  // if the format includes "date" get date data
  if (format.includes('date')) {
    month = date.getMonth() + 1;
    yearFull = date.getFullYear();
    year = yearFull.toString().slice(-2);
    day = date.getDate();
  }
  // if the format includes "time" get time data
  if (format.includes('time')) {
    hours = date.getHours();
    minutes = date.getMinutes();
    seconds = date.getSeconds();
    // 12 hour clock with am or pm
    ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    // the hour '0' should be '12'
    hours = hours ? hours : 12;
    // include leading '0' when less than 10
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
  }
  // based on format option, return the formatted date
  switch (format) {
    case 'date':
      // MM/DD/YY
      formattedDate = `${month}|${day}|${year}`;
      break;

    case 'time':
      // 00:00 AM/PM
      formattedDate = `${hours}:${minutes} ${ampm}`;
      break;

    case 'datetime':
      // MM/DD/YYYY @ 00:00:00 AM/PM
      formattedDate = `${month}|${day}|${yearFull} @ ${hours}:${minutes}:${seconds} ${ampm}`;
      break;

    default:
      // returns error string
      formattedDate = 'incorrect format';
      break;
  }

  return formattedDate;
};
