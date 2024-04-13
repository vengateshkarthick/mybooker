"use client";

import { useState, useCallback } from 'react';
import { z } from 'zod';
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useSignupModalStore from '@shared/hooks/useSignUpModal';
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import Modal from './Modals';
import Heading from '../Heading';
import Input from '../Inputs/Input';


const registerSchema = z.object({
    email: z.string().email("Enter a valid email"),
    password: z.string({ required_error: "Please enter your password "}).min(8, "Enter a valid password" ),
    name: z.string().min(1, "Enter a valid name"),
});

export default function RegisterModal() {
   const registerModal = useSignupModalStore();
   const [isLoading, setIsLoading] = useState(false);

   const { 
    register, 
    handleSubmit, 
    formState: {
        errors, isDirty, isValid, isSubmitting,
    }
   } = useForm<FieldValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
        name: '',
        email: '',
        password: ''
    },
    mode: 'onChange'
   });

   const onSubmit: SubmitHandler<FieldValues> = async (data) => {
      setIsLoading(true);
      try {
        const res =  await axios.post('/api/register', data);
        registerModal.onClose();

      }
      catch {
        setIsLoading(false);
      }
      

   }



   return (
    <Modal
       disable={isSubmitting}
       open={registerModal.isOpen}
       title='Register'
       actionLabel="Continue"
       onClose={registerModal.onClose}
       onSubmit={handleSubmit(onSubmit)}
    
    >
        <div className="flex flex-col gap-4">
            <Heading 
              subTitle='Create an account'
              title='Welcome to booker'
              center="yes"
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
        </div>

    </Modal>
   )
}