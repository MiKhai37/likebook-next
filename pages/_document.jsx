import Document, {
  Html,
  Head,
  Main,
  NextScript,
} from "next/document";

import React from "react";

// Solution to avoid the useLayoutEffect warning issue, _document.jsx create only to solve this issue
React.useLayoutEffect = React.useEffect;

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head></Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;