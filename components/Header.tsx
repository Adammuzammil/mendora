import { AudioLines, Menu, X } from "lucide-react";
import Link from "next/link";
import React from "react";
import ThemeToggle from "./ThemeToggle";
import AuthButton from "./AuthButton";
import MobileMenu from "./MobileMenu";

export const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/settings", label: "Settings" },
  { href: "/about", label: "About" },
];

const Header = () => {
  return (
    <div className="w-full fixed top-0 z-50  bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="absolute inset-0 border-b border-primary/10">
        <header className="relative  container mx-auto px-6">
          <div className="flex h-20 items-center justify-between">
            <Link
              href="/"
              className="flex items-center space-x-2 group transition-all duration-300 hover:opacity-90"
            >
              <div className="relative transition-transform duration-300 group-hover:scale-110">
                {/* Main gradient icon */}
                <AudioLines
                  className="w-7 h-7 transition-all duration-300"
                  style={{
                    background:
                      "linear-gradient(135deg, #1f2937 0%, #4DB6AC 60%, #26A69A 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                />
                {/* Dark mode gradient override */}
                <AudioLines
                  className="w-7 h-7 absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(135deg, #ffffff 0%, #4DB6AC 60%, #26A69A 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                />
                {/* Subtle animated glow */}
                <div className="absolute inset-0 w-7 h-7 opacity-0 group-hover:opacity-30 dark:group-hover:opacity-50 bg-gradient-to-br from-[#4DB6AC]/50 to-[#26A69A]/50 blur-md transition-opacity duration-300 rounded-full" />
              </div>
              <div>
                <span className="font-semibold text-lg bg-gradient-to-r from-gray-900 to-[#4DB6AC] dark:from-white dark:to-[#4DB6AC] bg-clip-text text-transparent">
                  Mendora
                </span>
              </div>
            </Link>

            <div className="flex items-center space-x-4">
              <nav className="hidden md:flex items-center space-x-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="px-4 py-2 text-sm font-medium  hover:text-foreground transition-colors relative group"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                  </Link>
                ))}
              </nav>

              <div className="flex items-center gap-4">
                <ThemeToggle />
                <AuthButton />

                {/* Mobile Menu */}
                <MobileMenu />

                {/* <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </Button> */}
              </div>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Header;
