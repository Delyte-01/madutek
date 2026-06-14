import localFont from "next/font/local";

export const clashGrotesk = localFont({
  src: [
    {
      path: "./fonts/ClashGrotesk-Extralight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/ClashGrotesk-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/ClashGrotesk-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/ClashGrotesk-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/ClashGrotesk-Semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/ClashGrotesk-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-clash-grotesk",
  display: "swap",
});

export const generalSans = localFont({
  src: [
    {
      path: "./fonts/GeneralSans-Extralight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/GeneralSans-ExtralightItalic.otf",
      weight: "200",
      style: "italic",
    },
    {
      path: "./fonts/GeneralSans-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/GeneralSans-LightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "./fonts/GeneralSans-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/GeneralSans-Italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/GeneralSans-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/GeneralSans-MediumItalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "./fonts/GeneralSans-Semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/GeneralSans-SemiboldItalic.otf",
      weight: "600",
      style: "italic",
    },
    {
      path: "./fonts/GeneralSans-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/GeneralSans-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-general-sans",
  display: "swap",
});
