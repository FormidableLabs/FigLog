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
    xxl: 44,
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
  formidable: '#f04d21',
};

export const GAP = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 16,
  xl: 32,
} as const;

export const RADIUS = {
  none: 0,
  xs: 2,
  sm: 4,
  md: 8,
  lg: 16,
} as const;

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

export const SPACE = {
  one: 1, // borders, dividers, strokes, w & h, etc
  xxxs: 4, // dashes,
  xxs: 12, // w & h of icons,
  xs: 16, // w & h of icons,
  sm: 24, // w & h of user avatar, formidable logo height
  md: 108, // once in empty state height, formidable logo width
  lg: 169, // once in empty state width,
  xl: 600, // widget width (sm) !! not in use yet
  xxl: 800, // widget width (md - default)
  xxxl: 1000, // widget width (lg) !! not in use yet
} as const;

export const OPACITY = {
  transparent: 0,
  semiTransparent: 0.4,
  semiOpaque: 0.8,
  opaque: 1,
} as const;
