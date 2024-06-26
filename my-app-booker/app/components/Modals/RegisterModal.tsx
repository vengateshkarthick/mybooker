"use client";

import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import { z } from "zod";
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
import { signIn } from "next-auth/react";
import useLoginModal from "@/app/shared/hooks/useLoginModal";

const registerSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z
    .string({ required_error: "Please enter your password " })
    .min(8, "Enter a valid password"),
  name: z.string().trim().min(1, "Enter a valid name"),
});

export default function RegisterModal() {
  const registerModal = useSignupModalStore();
  const loginModalStore = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm<FieldValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      const res = await axios.post("/api/register", data);
      if (res.data.success) {
        toast.success("Account created successfully");
      }
      registerModal.onClose();
    } catch {
      setIsLoading(false);
      toast.error("Internal Server Error 400!!");
    }
  };

  const handleLogin = () => {
    registerModal.onClose();
    loginModalStore.onOpen();
  };

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <div className="flex justify-between">
        <Button
          outline
          label="Google"
          icon={FcGoogle}
          onClick={() => {
            signIn("google");
          }}
          className="w-[40%]"
        />
        <Button
          outline
          label="GuitHub"
          icon={AiFillGithub}
          onClick={() => {
            signIn("github");
          }}
          className="w-[40%]"
        />
      </div>

      <div className="flex text-neutral text-center mt-4 font-light flex-row justify-center items-center gap-2">
        <div>Already have an account</div>
        <div
          className="text-blue-600 underline cursor-pointer"
          onClick={handleLogin}
        >
          Log in
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disable={isSubmitting}
      open={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      footer={footerContent}
    >
      <div className="flex flex-col gap-4">
        <Heading
          subTitle="Create an account"
          title="Welcome to booker"
          center="no"
        />

        <Input
          id="name"
          label="Name"
          name="name"
          register={register}
          disabled={isSubmitting || isLoading}
          errors={errors}
          required
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
