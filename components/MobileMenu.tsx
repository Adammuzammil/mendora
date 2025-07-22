"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navItems } from "./Header";
import Link from "next/link";

const MobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  return (
    <div className="md:hidden">
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetTrigger asChild>
          <button className="p-2 rounded-lg hover:bg-accent/50 transition-colors duration-200">
            <Menu className="h-5 w-5" />
          </button>
        </SheetTrigger>
        <SheetContent
          className="w-full border-0 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80"
          side="top"
        >
          <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-8">
            {/* Header with close button */}
            {/* <div className="absolute top-6 right-6">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-full hover:bg-accent/50 transition-colors duration-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div> */}

            {/* Brand/Logo section */}
            <div className="text-center mb-8">
              <span className="font-bold text-2xl bg-gradient-to-r from-gray-900 to-[#4DB6AC] dark:from-white dark:to-[#4DB6AC] bg-clip-text text-transparent">
                Mendora
              </span>
            </div>

            {/* Navigation links */}
            <nav className="flex flex-col items-center space-y-6 w-full max-w-xs">
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="group relative w-full text-center py-4 px-6 rounded-xl border border-border/50 bg-card/50 hover:bg-accent/50 transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-sm"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <span className="text-lg font-medium group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-[#4DB6AC] dark:group-hover:from-white dark:group-hover:to-[#4DB6AC] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                    {item.label}
                  </span>

                  {/* Subtle animated border */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-[#4DB6AC]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              ))}
            </nav>

            {/* Bottom decorative element */}
            <div className="mt-12 w-20 h-1 bg-gradient-to-r from-transparent via-[#4DB6AC] to-transparent rounded-full opacity-50" />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;
