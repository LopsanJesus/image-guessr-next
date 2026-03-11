import { Anton } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/TopBar/TopBar";
import I18nProvider from "@/components/I18nProvider";
import { GoogleAnalytics } from "@next/third-parties/google";

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
    apple: "/icon-180.png",
  },
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${anton.variable}`} style={{ backgroundColor: "var(--bg-app)" }} suppressHydrationWarning>
        <I18nProvider>
          <div className="router">
            <TopBar />
            <div className="content">
              {children}
            </div>
          </div>
        </I18nProvider>
        {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
      </body>
    </html>
  );
}
