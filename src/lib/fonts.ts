import localFont from "next/font/local";

export const euclidCircular = localFont({
  variable: "--font-euclid",
  display: "swap",
  src: [
    {
      path: "../../public/fonts/EuclidCircular-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/EuclidCircular-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../public/fonts/EuclidCircular-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/EuclidCircular-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/EuclidCircular-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/EuclidCircular-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../public/fonts/EuclidCircular-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/EuclidCircular-SemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../public/fonts/EuclidCircular-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/EuclidCircular-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
});
