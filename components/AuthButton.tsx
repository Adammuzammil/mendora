"use client";

import Link from "next/link";
import { Button } from "./ui/button";

interface authButtonProps {
  className?: string;
}

const AuthButton = ({ className }: authButtonProps) => {
  return (
    <Button asChild className={className}>
      <Link href={"/login"}>Sign In</Link>
    </Button>
  );
};

export default AuthButton;
