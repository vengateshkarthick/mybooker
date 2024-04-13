"use client";

import Container from "../Container";
import Logo from "./Logo";
import Menu from "./Menu";
import SearchBar from "./SearchBar";

export default function Navbar()  {
    return (
      <div className="fixed w-full bg-white z-10 shadow-sm">
        <div className="py-4 border-b">
          <Container>
            <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
             <Logo />
             <SearchBar />
             <Menu />
            </div>
          </Container>
        </div>

      </div>
    )
}