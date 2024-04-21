"use client";


import Container from "../Container";
import Logo from "./Logo";
import Menu from "./Menu";
import SearchBar from "./SearchBar";
import { SafeUser } from "@booker-types/";

export default function Navbar({ currentUser }: {currentUser?: SafeUser | null})  {
    return (
      <div className="fixed w-full bg-white z-10 shadow-sm">
        <div className="py-4 border-b">
          <Container>
            <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
             <Logo />
             <SearchBar />
             <Menu currentUser={currentUser} />
            </div>
          </Container>
        </div>

      </div>
    )
}