import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {


    render() {
        return (
            <Html lang="en">
                <Head >
                    <title>Tools of Umid</title>
                    <meta name="description" content="Web site created by Umidjon"/>
                    <meta name="theme-color" content="#343A40"/>
                    <link rel="icon" href="/icons/main-logo-ico.ico"/>
                    <link rel="apple-touch-icon" href="/icons/main-logo-png.png"/>
                </Head>
                <body>
                <Main />
                <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument