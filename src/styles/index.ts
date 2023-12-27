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

export const defaultTheme = {
  colors,
  fontSizes,
  fontFamilies,
  media,
  spacing,
};

type iTheme = typeof defaultTheme;

declare module "styled-components" {
  export interface DefaultTheme extends iTheme {}
}
