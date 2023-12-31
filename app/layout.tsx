import QueryProvider from "@/lib/QueryProvider";
import "./globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import ToastProvider from "@/lib/ToastProvider";
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css'


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sea Cinema | The Easy way to book your Next Cinema",
  description: "A website for booking your cinema tickets easily and conveniently.",
  keywords: ["cinema", "tickets", "booking"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className={inter.className}>
          <ToastProvider />
          <QueryProvider>{children}</QueryProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}
