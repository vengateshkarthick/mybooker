"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";
import { twMerge } from "tailwind-merge";

interface InputInterface {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    name: string;
    formatPrice?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
}

export default function Input({ id, name, label, disabled, required, register, errors, type = "text", formatPrice }: InputInterface) {
 return (
   <div className="w-full relative">
    { formatPrice && <BiDollar size={24} className="text-neutral-700 top-5 left-2 absolute"/>}
    <input 
      id={id}
      disabled={disabled}
      type={type}
      {...register(name, { required })}
      placeholder=" "
      className={twMerge("peer w-full p-4 pt-6 font-light bg-white")}
    />

   </div>

 )
}