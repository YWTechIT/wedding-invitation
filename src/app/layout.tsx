import type { Metadata, Viewport } from "next";
import { Bona_Nova, Gowun_Dodum, Noto_Sans_KR } from "next/font/google";
import { WEDDING } from "@/config/wedding";
import "./globals.css";

const GOWUN_DODUM = Gowun_Dodum({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-gowun-dodum",
});

const BONA_NOVA = Bona_Nova({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bona-nova",
});

// Only used for a few bold names, so it is not worth a preload.
const NOTO_SANS_KR = Noto_Sans_KR({
  weight: "700",
  preload: false,
  variable: "--font-noto-sans-kr",
});

export const metadata: Metadata = {
  title: WEDDING.meta.title,
  description: WEDDING.meta.description,
};

// viewport-fit=cover is required for env(safe-area-inset-*) to be non-zero.
export const viewport: Viewport = {
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={`${GOWUN_DODUM.variable} ${BONA_NOVA.variable} ${NOTO_SANS_KR.variable} antialiased`}
    >
      <body>
        <div className="mx-auto w-full max-w-md">{children}</div>
      </body>
    </html>
  );
}
