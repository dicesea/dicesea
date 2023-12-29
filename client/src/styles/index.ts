// for media query
const customMediaQuery = (maxWidth: number) =>
  `@media (max-width: ${maxWidth}px)`;

// for passing of custom value
const customValue = (val: number) => `${val}px`;

interface IMediaQueriesBreakpoints {
  custom: (maxNumber: number) => string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
}

const media: IMediaQueriesBreakpoints = {
  custom: customMediaQuery,
  xs: customMediaQuery(330),
  sm: customMediaQuery(592),
  md: customMediaQuery(768),
  lg: customMediaQuery(992),
  xl: customMediaQuery(1024),
  xxl: customMediaQuery(1200),
};

const colors = {
  gradients: {
    primary: {
      100: "#EFEAF0",
      200: "#E6F5F3",
      300: "#E6EDF2",
    },
    secondary: {
      100: "#E9D7E4",
      200: "#EADCE1",
      300: "#D6DEEA",
      400: "#CFE4F5",
      500: "#E7E8F6",
      600: "#D0ECF7",
    },
  },
  lightPink: "#F8F1EA",
  black: "#000",
  white: "#fff",
  green: "#038b5c",
  yellow: "#ffc501",
  pupulur: "#8c77ec",
};

const fontSizes = {
  sm: "12px",
  md: "16px",
  lg: "22px",
  custom: customValue,
};

const fontFamilies = {
  clash: {
    bold: "ClashDisplayBold, sans-serif",
    extraLight: "ClashDisplayXtraLight, sans-serif",
    light: "ClashDisplayLight, sans-serif",
    medium: "ClashDisplayMedium, sans-serif",
    regular: "ClashDisplayRegular, sans-serif",
    semiBold: "ClashDisplaySemiBold, sans-serif",
  },
  manhope: {
    bold: "ManropeBold, sans-serif",
    extraBold: "ManropeExtraBold,sans-serif",
    extraLight: "ManropeExtraLight, sans-serif",
    light: "ManropeLight, sans-serif",
    medium: "ManropeMedium, sans-serif",
    regular: "ManropeRegular, sans-serif",
    semiBold: "ManropeSemiBold, sans-serif",
  },
};

const spacing = {
  xs: "10px",
  sm: "14px",
  md: "22px",
  custom: customValue,
};

const borderRadius = {
  squircle: "6px",
  default: "10px",
  medium: "8px",
  large: "12px",
  button: "12px",
  toast: "12px",
  list: "12px",
  pill: "16px",
  pillLarge: "50px",
  pillXLarge: "100px",
  xlarge: "16px",
  xxlarge: "24px",
  modal: "16px",
  tooltipLarge: "24px",
  circle: "50%",
} as const;

const gradients = {
  banner: `linear-gradient(
      164.51deg,
      rgba(164, 252, 188, 0.7) 0%,
      rgba(255, 255, 255, 0) 93.19%
    ),
    linear-gradient(
      165.14deg,
      rgba(23, 149, 188, 0.7) 15.47%,
      rgba(23, 149, 188, 0) 100%
    ),
    rgba(23, 79, 188, 0.84)`,
  openseaPro: `linear-gradient(
    94.99deg,
    #D372DA 13.62%,
    #E3798D 53.55%,
    #F0B15D 98.83%
  )`,
  carousel: {
    overlay: {
      back: {
        default: `linear-gradient(90deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 100%)`,
        hover: `linear-gradient(90deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%)`,
      },
      forward: {
        default: `linear-gradient(270deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 100%)`,
        hover: `linear-gradient(270deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%)`,
      },
    },
  },
};

export const defaultTheme = {
  colors,
  fontSizes,
  fontFamilies,
  media,
  spacing,
  borderRadius,
  gradients,
};

type iTheme = typeof defaultTheme;

declare module "styled-components" {
  export interface DefaultTheme extends iTheme {}
}
