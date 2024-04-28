type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

interface Font {
  family: string;
  size: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  weight: {
    light: FontWeight;
    regular: FontWeight;
    semiBold: FontWeight;
    bold: FontWeight;
  };
  letterSpacing: {
    sm: number;
    md: number;
    lg: number;
  };
  lineHeight: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
}

export const FONT: Font = {
  family: 'IBM Plex Sans',
  weight: {
    light: 300,
    regular: 400,
    semiBold: 600,
    bold: 700,
  },
  letterSpacing: {
    sm: 0.4,
    md: 0.8,
    lg: 1,
  },
  size: {
    xs: 10,
    sm: 12,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 40,
  },
  lineHeight: {
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 28,
    xxl: 48,
  },
};

export const COLOR = {
  black: '#2F2D2E',
  blue: '#0077B6',
  green: '#99C24D',
  grey: '#E6E6E6',
  greyDark: '#676D75',
  greyLight: '#F6F7F8',
  orange: '#F18F01',
  purple: '#7F2982',
  red: '#C34C4E',
  tan: '#EBE5DA',
  white: '#FFFFFF',
};

// GAP should be used for vertical and horizontal auto layout gap spacing only
export const GAP = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

// RADIUS should be used for corner radius values only
export const RADIUS = {
  none: 0,
  xs: 2,
  sm: 4,
  md: 8,
  lg: 16,
} as const;

// PADDING should be used for vertical and horizontal padding and absolute offset values only
export const PADDING = {
  none: 0,
  xxs: 4,
  xs: 6,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

// SPACE should be used for width and height values only
export const SPACE = {
  one: 1, // borders, dividers, strokes, w & h, etc
  xxxs: 4, // dashes
  xxs: 12, // w&h small icons
  xs: 16, // w&h medium icons
  sm: 24, // w&h large icons and user avatar
  md: 92, // date and time range field width, meta value field width
  lg: 108, // no logs empty state height
  xl: 169, // no logs empty state width, link label field width
  xxl: 800, // widget width default
  xxxl: 1000, // widget width large (! not used yet)
} as const;

export const OPACITY = {
  transparent: 0,
  semiTransparent: 0.4,
  semiOpaque: 0.8,
  opaque: 1,
} as const;
