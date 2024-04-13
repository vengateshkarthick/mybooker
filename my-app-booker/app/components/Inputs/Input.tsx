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

export default function Input({
  id,
  name,
  label,
  disabled,
  required,
  register,
  errors,
  type = "text",
  formatPrice,
}: InputInterface) {
  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar
          size={24}
          className="text-neutral-700 top-5 left-2 absolute"
        />
      )}
      <input
        id={id}
        disabled={disabled}
        type={type}
        {...register(name, { required })}
        placeholder=" "
        className={twMerge(
          "peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transistion disabled:opactity-70 disabled:cursor-none",
          formatPrice ? "pl-9" : "pl-4",
          errors[name]?.message
            ? "border-rose-500 focus:border-rose-500"
            : "border-neutral-300 focus:border-blue-700/50"
        )}
      />
      <label
        className={twMerge(
          "absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0]",
          formatPrice ? "left-9" : "left-4",
          "peer-placeholder-shown:scale-100 peer-placeholder-shown:trnaslate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4",
          errors[name]?.message ? "text-rose-500" : "text-zinc-400"
        )}
      >
        {label}
      </label>
      {errors && errors[name]?.message && (
        <div className="text-rose-500 text-xs text-start py-1 ps-0">
          {errors[name]?.message as string}
        </div>
      )}
    </div>
  );
}
