"use client"

import { twMerge } from "tailwind-merge";

interface HeadingInterface {
    title: string;
    subTitle: string;
    center?: "yes" | "no",
    headerClassName?: string;
}

export default function Heading({ title, subTitle, center = "no", headerClassName = " "}: HeadingInterface) {
    return (
        <div className={twMerge(center === "yes" ? "text-center" : 'text-start', headerClassName)}>
            <div className="text-2xl font-[500]">
                {title}
            </div>
            <div className="font-light text-neutral-500 mt-2">
                {subTitle}
            </div>
        </div>
    )
}