import type { Metadata, Viewport } from "next";
// import { Archivo } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import ReduxProvider from "./reduxProvider";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";

// const archivo = Archivo({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MetaWar",
  description:
    "Dive into the world of MetaWar, an innovative AAA shooter game that’s set to push the boundaries of traditional gaming. MetaWar offers intense gameplay, cutting-edge technology, and blockchain integration to deliver an unparalleled gaming experience.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <Header />
          {children}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
