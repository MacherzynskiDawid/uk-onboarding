import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ServiceWorkerRegister from "./sw-register";
import { isFirebaseConfigured } from "@/app/firebase/setup";
import AssistantWidget from "@/components/AssistantWidget"; // 👈 Added import

export const metadata = {
  title: "UK Newcomer Guides",
  description: "Bilingual step-by-step guides for setting up life in the UK.",
  manifest: "/manifest.webmanifest",
};

export const viewport = { themeColor: "#4338ca" };

export default function RootLayout({ children }) {
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
            <AssistantWidget /> {/* 👈 Added component */}
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}