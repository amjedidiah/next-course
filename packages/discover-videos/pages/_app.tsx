import "styles/globals.scss"
import type { AppProps } from "next/app";
import font from "../utils/font.util";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={font.className}>
      <Component {...pageProps} />
    </main>
  );
}
