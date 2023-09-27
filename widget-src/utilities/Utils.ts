// Description: This file contains utility functions that are used throughout the widget.

// returns a random id, generally used as id for a changelog entry
export const randomId = () => Math.random().toString(36).substring(2, 15);

// returns the current date in the format of MM/DD/YYYY
export const getDate = () => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${month}|${date}|${year}`;
};

// returns the current date and time in the format of MM/DD/YYYY @ 00:00:00 AM/PM
export const getDateTime = () => {
  const today = new Date();
  let hours = today.getHours() % 12;
  const format = hours >= 12 ? 'PM' : 'AM';
  const time =
    (hours = hours ? hours : 12) +
    ':' +
    (today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes()) +
    ':' +
    (today.getSeconds() < 10 ? '0' + today.getSeconds() : today.getSeconds()) +
    ' ' +
    format;
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${month}|${date}|${year} @ ${time}`;
};

// returns the current time in the format of 00:00:00 AM/PM
export const getTime = () => {
  const today = new Date();
  let hours = today.getHours() % 12;
  const format = hours >= 12 ? 'PM' : 'AM';
  const time =
    (hours = hours ? hours : 12) +
    ':' +
    (today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes()) +
    ':' +
    (today.getSeconds() < 10 ? '0' + today.getSeconds() : today.getSeconds()) +
    ' ' +
    format;
  return `${time}`;
};
