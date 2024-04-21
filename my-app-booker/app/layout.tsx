import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@components/Navbar/Navbar";
import RegisterModal from "@components/Modals/RegisterModal";
import ShowToast from "@components/ShowToast";
import LoginModal from "@components/Modals/LoginModal";
import getCurrentUser from "@actions/currentUser";
import { SafeUser } from "@booker-types/";

const inter = Poppins({ style: "normal", subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "My booker",
  description: "Booking for my vaccations",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const current_user = await getCurrentUser();
  console.log(current_user);
  return (
    <html lang="en">
      <body className={inter.className}>
        <RegisterModal />
        <ShowToast />
        <LoginModal />
        <Navbar currentUser={current_user as SafeUser} />
        {children}
      </body>
    </html>
  );
}
