import "./globals.css";
import Script from "next/script";
import { AuthProvider } from "@/components/AuthProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ServiceWorkerRegister from "./sw-register";
import { isFirebaseConfigured } from "@/app/firebase/setup";
import AssistantWidget from "@/components/AssistantWidget";

export const metadata = {
  title: "UK Newcomer Guides",
  description: "Bilingual step-by-step guides for setting up life in the UK.",
  manifest: "/manifest.webmanifest",
};

export const viewport = { themeColor: "#4338ca" };

export default function RootLayout({ children }) {
  const mazeId = process.env.NEXT_PUBLIC_MAZE_ID;

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {mazeId && (
          <Script id="maze-snippet" strategy="afterInteractive">
            {`
              (function (m, a, z, e) {
                var s, t, u, v;
                try {
                  t = m.sessionStorage.getItem('maze-us');
                } catch (err) {}

                if (!t) {
                  t = new Date().getTime();
                  try {
                    m.sessionStorage.setItem('maze-us', t);
                  } catch (err) {}
                }

                u = document.currentScript || (function () {
                  var w = document.getElementsByTagName('script');
                  return w[w.length - 1];
                })();
                v = u && u.nonce;

                s = a.createElement('script');
                s.src = z + '?apiKey=' + e;
                s.async = true;
                if (v) s.setAttribute('nonce', v);
                a.getElementsByTagName('head')[0].appendChild(s);
                m.mazeUniversalSnippetApiKey = e;
              })(window, document, 'https://snippet.maze.co/maze-universal-loader.js', '${mazeId}');
            `}
          </Script>
        )}
        <AuthProvider>
          <LanguageProvider>
            {!isFirebaseConfigured && (
              <div className="config-banner">
                Preview mode - Firebase is not configured, so accounts and cloud sync are off. Progress is saved on this device.
              </div>
            )}
            <Nav />
            <div className="container">{children}</div>
            <Footer />
            <ServiceWorkerRegister />
            <AssistantWidget />
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}