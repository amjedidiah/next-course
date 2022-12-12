import Document, { Html, Main, NextScript, Head } from "next/document"
import fonts from "utils/fonts.util"

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta
            name="description"
            content="Coffee Connoisseur built by Jedidiah Amaraegbu"
          />
          <link rel="icon" href="/favicon.ico" />
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
          <Main /> {/* Adds a div with class: __next to the page */}
          <NextScript /> {/*  Adds a number of script tags to the document */}
        </body>
      </Html>
    )
  }
}
