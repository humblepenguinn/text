import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import ToastContext from "./context/ToastContext";
import AuthContext from "./context/AuthContext";
import ActiveStatus from "./components/ActiveStatus";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Text",
  description: "A text messaging app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
          <ToastContext />
          <ActiveStatus />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
