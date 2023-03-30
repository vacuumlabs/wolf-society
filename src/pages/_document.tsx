import { Html, Head, Main, NextScript } from 'next/document'
import React from 'react'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <div style={{ overflowX: 'hidden' }}>
          <Main />
          <NextScript />
        </div>
      </body>
    </Html>
  )
}
