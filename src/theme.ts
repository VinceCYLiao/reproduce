import { createTheme, adaptV4Theme } from "@mui/material/styles";

export type ColorScale = { [scale: string]: string };
export type PrimaryColors = {
  yellow: ColorScale;
  black: string;
  white: string;
  lightgray: string;
  gray: string;
  darkgray: string;
};
export type SecondaryColors = {
  yellow: string;
  lightblue: string;
  darkblue: string;
};
export type Colors = {
  primary: PrimaryColors;
  secondary: SecondaryColors;
  information: string;
  success: string;
  error: string;
  warning: string;
  background: string;
  gray: ColorScale;
};
declare module "@mui/material/styles" {
  interface Theme {
    colors: Colors;
  }
  // allow configuration using `createTheme`
  interface DeprecatedThemeOptions {
    colors: Colors;
  }
  interface TypographyVariants {
    h1s: React.CSSProperties;
    h2s: React.CSSProperties;
    h3s: React.CSSProperties;
    h4s: React.CSSProperties;
    h5s: React.CSSProperties;
    h6s: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    h1s: React.CSSProperties;
    h2s: React.CSSProperties;
    h3s: React.CSSProperties;
    h4s: React.CSSProperties;
    h5s: React.CSSProperties;
    h6s: React.CSSProperties;
  }
}
const primaryYellow = {
  300: "#FFF092",
  400: "#FFEC64",
  500: "#FEE500",
  600: "#FDD100",
  700: "#FCB902",
  800: "#FC9F01",
  900: "#FA7302",
};

const primaryBlack = "#1F1F1F";
const primaryWhite = "#FFFFFF";
const primaryLightGray = "#EEEEEE";
const primaryGray = "#E6E6E6";
const primaryDarkGray = "#666666";
const secondaryYellow = "#FFF6A3";
const secondaryLightblue = "#05DDE2";
const secondaryDarkblue = "#185A7D";

const grayScale = {
  100: "#F2F2F2",
  200: "#E0E0E0",
  300: "#BDBDBD",
  400: "#828282",
  500: "#4F4F4F",
  600: "#333333",
};

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true;
    xsm: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
  }
}

// Create a theme instance.
const theme = createTheme(adaptV4Theme({
  colors: {
    primary: {
      yellow: primaryYellow,
      black: primaryBlack,
      white: primaryWhite,
      lightgray: primaryLightGray,
      gray: primaryGray,
      darkgray: primaryDarkGray,
    },
    secondary: {
      yellow: secondaryYellow,
      lightblue: secondaryLightblue,
      darkblue: secondaryDarkblue,
    },
    information: "#2F80ED",
    success: "#34C759",
    error: "#F03E3E",
    warning: "#F2994A",
    background: "#EFF3F5",
    gray: grayScale,
  },
  //  theme.spacing(2);  -> `${4 * 2}px` = '8px'
  spacing: 4,
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          fontSize: "inherit",
          fontWeight: "inherit",
          color: "inherit",
          fontFamily: "inherit",
          whiteSpace: "nowrap",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0 8px 8px 0 rgba(0,0,0,0.1), 0 0 4px 0 rgba(0,0,0,0.05)",
          background: "white",
          color: primaryBlack,
          paddingRight: 0,
          paddingLeft: 0,
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          paddingRight: 0,
          paddingLeft: 0,
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          paddingTop: 0,
          paddingBottom: 0,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          lineHeight: 1,
          color: primaryBlack,
        },
      },
    },
    MuiDialogContentText: {
      styleOverrides: {
        root: {
          color: "inherit",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: "inherit",
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      xsm: 375,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1440,
    },
  },
  typography: {
    fontFamily: ["PingFang TC", "NotoSansTC", "SF Compact Text", "Roboto"].join(
      ",",
    ),
    h1: {
      fontSize: "28px",
      fontWeight: 600,
    },
    h2: {
      fontSize: "26px",
      fontWeight: 600,
    },
    h3: {
      fontSize: "24px",
      fontWeight: 600,
    },
    h4: {
      fontSize: "20px",
      fontWeight: 600,
    },
    h5: {
      fontSize: "18px",
      fontWeight: 500,
    },
    h6: {
      fontSize: "17px",
      fontWeight: 500,
    },
    h1s: {
      fontSize: "28px",
      fontWeight: 500,
    },
    h2s: {
      fontSize: "26px",
      fontWeight: 500,
    },
    h3s: {
      fontSize: "24px",
      fontWeight: 500,
    },
    h4s: {
      fontSize: "20px",
      fontWeight: 500,
    },
    h5s: {
      fontSize: "18px",
      fontWeight: 400,
    },
    h6s: {
      fontSize: "17px",
      fontWeight: 400,
    },
  },
}));

export default theme;
