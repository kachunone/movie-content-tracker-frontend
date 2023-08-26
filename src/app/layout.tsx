import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/footer/Footer";
import { AuthContextProvider } from "../context/auth";
import PrimarySearchAppBar from "@/components/appbar/AppBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CineTracker",
  description: "An app helps you to manage movie content.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <PrimarySearchAppBar />
          {children}
          <Footer></Footer>
        </AuthContextProvider>
      </body>
    </html>
  );
}
