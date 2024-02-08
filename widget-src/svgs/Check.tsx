import { COLOR } from "../utilities/Styles";

export const Check = ( {color = COLOR.black} ) => (
  `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" fill="${color}" d="M19.7071 6.29289C20.0976 6.68342 20.0976 7.31658 19.7071 7.70711L10.0821 17.3321C9.69158 17.7226 9.05842 17.7226 8.66789 17.3321L4.29289 12.9571C3.90237 12.5666 3.90237 11.9334 4.29289 11.5429C4.68342 11.1524 5.31658 11.1524 5.70711 11.5429L9.375 15.2108L18.2929 6.29289C18.6834 5.90237 19.3166 5.90237 19.7071 6.29289Z"/>
  </svg>`
);