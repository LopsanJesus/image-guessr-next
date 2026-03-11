import { Anton } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/TopBar/TopBar";
import I18nProvider from "@/components/I18nProvider";
import PageTransition from "@/components/PageTransition/PageTransition";
import { GoogleAnalytics } from "@next/third-parties/google";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration/ServiceWorkerRegistration";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-custom",
});

export const metadata = {
  title: "ImageGuessr",
  description: "Adivina la ciudad a partir de imágenes de todo el mundo",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ImageGuessr",
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/icon-180.png",
  },
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${anton.variable}`} style={{ backgroundColor: "var(--bg-app)" }} suppressHydrationWarning>
        <ServiceWorkerRegistration />
        <I18nProvider>
          <div className="router">
            <TopBar />
            <PageTransition>
              {children}
            </PageTransition>
          </div>
        </I18nProvider>
        {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
      </body>
    </html>
  );
}
