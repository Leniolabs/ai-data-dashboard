import "../styles/globals.css";
import type { AppProps } from "next/app";
import gtag from "../lib/gtag";

gtag.initialize(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID);

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
