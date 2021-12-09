import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head >
                    <title>Tools of Umid</title>
                    <meta name="description" content="Web site created by Umidjon. Crazy tools."/>
                    <meta name="theme-color" content="#343A40"/>
                    <link rel="icon" href="/icons/main-logo-ico.ico"/>
                    <link rel="apple-touch-icon" href="/icons/main-logo-png.png"/>
                    <link rel="manifest" href="/manifest.json" />
                    <meta name="color-scheme" content="light dark"/>
                </Head>
                <body>
                <Main />
                <NextScript />
                <script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async=""/>
                </body>
            </Html>
        )
    }
}

export default MyDocument