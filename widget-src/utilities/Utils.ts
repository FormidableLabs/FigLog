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
