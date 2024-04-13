import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import Modal from "./components/Modals/Modals";
import RegisterModal from "./components/Modals/RegisterModal";
import ShowToast from "./components/ShowToast";

const inter = Poppins({ style: "normal", subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "My booker",
  description: "Booking for my vaccations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RegisterModal />
        <ShowToast />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
