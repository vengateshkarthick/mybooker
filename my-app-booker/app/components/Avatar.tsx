"use client"

import Image from "next/image"
import avatar from "@assests/avatar.svg"

export default function Avatar({ userImg = null }: { userImg?: string | null}) {
  return (
    <Image 
      className="rounded-full"
      height={30}
      width={30}
      alt="avatar"
      src={userImg || avatar}

    />
  )
}