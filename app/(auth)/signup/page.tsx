"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="h-screen flex items-center justify-center bg-background px-4 animate-fade-in">
      <Card className="w-full max-w-md border border-primary/10 backdrop-blur-sm bg-background/60 shadow-xl rounded-2xl p-4 sm:p-6">
        <CardHeader className="text-center space-y-1">
          <h2 className="text-2xl font-semibold text-foreground">
            Create your account
          </h2>
          <p className="text-sm text-muted-foreground">
            Join us and start your journey
          </p>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* Name */}
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-foreground/80">
              Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Your full name"
              className="bg-white/10 border border-border/20 focus-visible:ring-primary"
            />
          </div>

          {/* Email */}
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-foreground/80">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="bg-white/10 border border-border/20 focus-visible:ring-primary"
            />
          </div>

          {/* Password */}
          <div className="grid gap-2 relative">
            <Label htmlFor="password" className="text-foreground/80">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="bg-white/10 border border-border/20 pr-10 focus-visible:ring-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="grid gap-2 relative">
            <Label htmlFor="confirm-password" className="text-foreground/80">
              Confirm Password
            </Label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                className="bg-white/10 border border-border/20 pr-10 focus-visible:ring-primary"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300">
            Sign Up
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary underline">
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignupPage;
