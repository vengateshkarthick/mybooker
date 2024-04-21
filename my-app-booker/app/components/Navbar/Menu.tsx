"use client";

import { useCallback, useState } from "react";
import { signOut } from 'next-auth/react'
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import useToggle from "@shared/hooks/useToogle";
import useSingUpModalStore from "@/app/shared/hooks/useSignUpModal";
import useLoginModal from "@/app/shared/hooks/useLoginModal";
import { SafeUser } from "@booker-types/";

export default function Menu({ currentUser }: { currentUser?: SafeUser | null }) {
  const [toggleOpen, isOpen] = useToggle();
  const signUpModal = useSingUpModalStore();
  const loginModal = useLoginModal();

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => {}}
          className="hidden sm:block text-sm font-semibold py-3 px-4 rounded-full transistion hover:bg-neutral-100 cursor-pointer"
        >
          Air Home Modal
        </div>
        <div
          onClick={() => toggleOpen()}
          className="p-4 md:py-1 md:px-2 flex flex-row items-center gap-3 border rounded-full cursor-pointer hover:shadow-md transistion"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar userImg={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="rounded-xl absolute shadow-md w-[40vw] md:w-3/4 overflow-hidden right-0 top-12 text-sm z-20 bg-white transistion-ease">
          <div className="flex flex-col cursor-pointer">
            <>
              {currentUser ? (
                <>
                  <MenuItem label="My trips" onSelectMenuItem={() => {}} />
                  <MenuItem label="My favorities" onSelectMenuItem={() => {}} />
                  <MenuItem
                    label="My reservations"
                    onSelectMenuItem={() => {}}
                  />
                  <MenuItem label="My properties" onSelectMenuItem={() => {}} />
                  <MenuItem label="booker Home" onSelectMenuItem={() => {}} />
                  <hr />
                  <MenuItem label="Log out" onSelectMenuItem={() => signOut()} />

                </>
              ) : (
                <>
                  <MenuItem
                    label="Login"
                    onSelectMenuItem={() => {
                      loginModal.onOpen();
                    }}
                  />
                  <MenuItem
                    label="Signup"
                    onSelectMenuItem={() => signUpModal.onOpen()}
                  />
                </>
              )}
            </>
          </div>
        </div>
      )}
    </div>
  );
}
