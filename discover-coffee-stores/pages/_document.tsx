import Document, { Html, Main, NextScript, Head } from "next/document";

const fonts = [
  "/fonts/IBMPlexSans-Bold.ttf",
  "/fonts/IBMPlexSans-Regular.ttf",
  "/fonts/IBMPlexSans-SemiBold.ttf",
];

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {fonts.map((font) => (
            <link
              rel="preload"
              href={font}
              as="font"
              crossOrigin="anonymous"
              key={font}
            />
          ))}
        </Head>
        {/* Add things for the head tag that should be on all the pages, here */}
        <body>
          <Main></Main> {/* Adds a div with class: __next to the page */}
          <NextScript /> {/*  Adds a number of script tags to the document */}
        </body>
      </Html>
    );
  }
}
