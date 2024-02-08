import { COLOR } from "../utilities/Styles";

export const Prototype = ( {color = COLOR.black} ) => (
  `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" fill="${color}" d="M5.44061 3.34172C5.68141 3.21025 5.97479 3.22076 6.20557 3.36912L18.65 11.3691C18.8647 11.5071 18.9944 11.7448 18.9944 12C18.9944 12.2552 18.8647 12.4929 18.65 12.6309L6.20557 20.6309C5.97479 20.7792 5.68141 20.7898 5.44061 20.6583C5.1998 20.5268 5.05 20.2744 5.05 20V4C5.05 3.72565 5.1998 3.47318 5.44061 3.34172ZM6.55 5.37375V18.6263L16.8575 12L6.55 5.37375Z"/>
  </svg>`
);