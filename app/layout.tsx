import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import "./globals.css";

import "../app/styles/globals.scss";
import type { AppProps } from "next/app";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Head from "next/head";
import Providers from "./components/Providers";
// config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

// function RootLayout({ Component, pageProps }: AppProps) {
//   return (
//     <>
//       <Head>
//         <title>Tailors App</title>
//         <meta name="description" content="Generated by create next app" />
//         <link rel="icon" href="/favicon/favicon.ico" />
//       </Head>
//       <Providers>
//         {/* <Component {...pageProps} /> */}
//       </Providers>
//     </>
//   );
// }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
// export default RootLayout;

// import "../app/styles/globals.scss";
// import type { AppProps } from "next/app";
// import { config } from "@fortawesome/fontawesome-svg-core";
// import "@fortawesome/fontawesome-svg-core/styles.css";
// import Head from "next/head";
// import Providers from "./components/Providers";
// config.autoAddCss = false;

// function RootLayout({ Component, pageProps }: AppProps) {
//   return (
//     <>
//       <Head>
//         <title>Tailors App</title>
//         <meta name="description" content="Generated by create next app" />
//         <link rel="icon" href="/favicon/favicon.ico" />
//       </Head>
//       <Providers>
//         {/* <Component {...pageProps} /> */}
//       </Providers>
//     </>
//   );
// }

// export default RootLayout;
