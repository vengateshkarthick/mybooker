"use client";
import { logo } from "@assests/logo";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Logo() {
    const router = useRouter();
    return (
        <Image 
          alt="logo"
          className="hidden md:block cusor-pointer"
          height={90}
          width={90}
          src={logo}
        />

    )
}