"use client";

import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import { z } from "zod";
import { signIn } from 'next-auth/react';
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import useSignupModalStore from "@shared/hooks/useSignUpModal";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import Modal from "./Modals";
import Heading from "../Heading";
import Input from "../Inputs/Input";
import Button from "../Button";
import useLoginModal from "@/app/shared/hooks/useLoginModal";


const registerSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z
    .string({ required_error: "Please enter your password " })
    .min(8, "Enter a valid password"),
});

export default function LoginModal() {
  const registerModal = useSignupModalStore();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm<FieldValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    signIn('credentials', {
      ...data,
      redirect: false,
    })
    .then((callback) => {
      setIsLoading(false);
     
      if (callback?.ok) {
        toast.success("Successfully Logged in...");
        router.refresh();
        loginModal.onClose();
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    })
  };


  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button 
         outline
         label="Sign up with Google"
         icon={FcGoogle}
         onClick={() => {}}
      />

      <Button 
         outline
         label="Sign up with GitHub"
         icon={AiFillGithub}
         onClick={() => {}}
      />

      <div className="flex text-neutral text-center mt-4 font-light flex-row justify-center items-center gap-2">
        <div>
          Already have an account
        </div>
        <div className="text-blue-600 underline cursor-pointer" onClick={registerModal.onClose}>
         Log in
        </div>
      </div>

    </div>
  )

  return (
    <Modal
      disable={isSubmitting}
      open={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      footer={footerContent}
    >
      <div className="flex flex-col gap-4">
        <Heading
          subTitle="Login to your account"
          title="Welcome back !!"
          center="no"
        />
        
        
        <Input
          id="email"
          label="Email"
          name="email"
          register={register}
          disabled={isSubmitting || isLoading}
          errors={errors}
          required
        />

        <Input
          id="password"
          label="Password"
          name="password"
          type="password"
          register={register}
          disabled={isSubmitting || isLoading}
          errors={errors}
          required
        />
      </div>
    </Modal>
  );
}
