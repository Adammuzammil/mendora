import { AudioLines } from "lucide-react";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="w-full fixed top-0 z-50">
      <div className="">
        <header className="relative max-w-7xl mx-auto px-4 ">
          <div className="flex h-16 items-center justify-between">
            <Link
              href="/"
              className="flex items-center space-x-2 transition-opacity hover:opacity-80"
            >
              <AudioLines className="w-7 h-7" />
              <div>
                <span className="font-semibold text-lg bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Mendora
                </span>
              </div>
            </Link>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Header;
