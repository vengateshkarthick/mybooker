"use client";

import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface ButtonInterface {
    onClick: () => void;
    disable?: boolean;
    label: string;
    outline?: boolean;
    small?: boolean;
    icon?: IconType; 
    className?: string;
    type?: "submit" | "button"
}

export default function Button({
    label, onClick, disable, outline, small, icon:Icon, className, type = "button"
} : ButtonInterface) {
    return (
        <button 
         className={twMerge("relative disabled:opacity-70 disabled:cursor-not-allowed transistion w-full rounded-lg hover:opactiy-80", 
            outline ? "bg-white border-black/75 text-black": 'bg-rose-500 border-rose-500 text-white',
            small? "py-1 text-sm font-light border" : "py-3 text-md font-semibold border-2",
            className,

         )}
         onClick={onClick}
         disabled={disable}
         type={type}
        >
        {Icon && <Icon size={24} className="absolute left-4 top-3" />}
        {label}
        </button>
    )
}