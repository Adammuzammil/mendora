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
import { cn } from "@/lib/utils";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="h-screen flex items-center justify-center bg-background px-4 animate-fade-in">
      <Card className="w-full max-w-md border border-primary/10 backdrop-blur-sm bg-background/60 shadow-xl rounded-2xl p-2 sm:p-4">
        <CardHeader className="text-center space-y-1">
          <h2 className="text-2xl font-semibold text-foreground">
            Welcome Back
          </h2>
          <p className="text-sm text-muted-foreground">
            Log in to continue your journey
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
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

          {/* Password with toggle */}
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
            <div className="text-right text-xs">
              <Link
                href="/forgot-password"
                className="text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300">
            Log In
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-primary underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
