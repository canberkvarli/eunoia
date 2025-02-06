"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ClientSafeProvider, signIn } from "next-auth/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface AuthFormProps {
  providers?: Record<string, ClientSafeProvider>;
  className?: string;
}

export default function AuthForm({ providers, className }: AuthFormProps) {
  const searchParams = useSearchParams();
  const initialMode = searchParams.get("mode") === "signup" ? false : true;
  const [isLogin, setIsLogin] = useState(initialMode);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const mode = searchParams.get("mode");
    if (mode === "signup") {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [searchParams]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (isLogin) {
      // Login logic
      const result = await signIn("credentials", {
        callbackUrl: "/dashboard",
        email,
        password,
      });
      if (result?.error) {
        setErrorMessage(result.error);
      }
    } else {
      // Signup logic – replace this with your actual signup implementation
      try {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Signup failed");
        }
        // After a successful signup, automatically log in
        const result = await signIn("credentials", {
          callbackUrl: "/dashboard",
          email,
          password,
        });
        if (result?.error) {
          setErrorMessage(result.error);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("An unknown error occurred");
        }
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6 w-[20rem] mx-auto", className)}>
      {/* Header Section */}
      <div className="flex flex-col items-center">
        {/* Logo */}
        <Image
          src="https://static.accelerator.net/134/0.51.2/images/thinker.svg"
          alt="Thinker logo"
          width={55}
          height={55}
        />
        {/* Header Text */}
        <h2
          className={`text-[4rem] w-[19rem] text-gray-900 text-center font-normal leading-[4rem] ${
            isLogin ? "w-[19rem]" : "w-[25rem]"
          }`}
        >
          {isLogin ? "Access your mind" : "Your new mind is here"}
        </h2>
        {!isLogin && (
          <p className="text-gray-600 text-center">
            Choose a signup option below to get started.
          </p>
        )}
      </div>

      {/* Provider Buttons */}
      <div className="flex flex-col items-center gap-2">
        {providers &&
          Object.values(providers).map((provider) => {
            // Skip the credentials provider since it’s handled via the form
            if (provider.id === "credentials") return null;

            // Adjust the button text based on the current mode.
            const buttonText = isLogin
              ? `Sign in with ${provider.name}`
              : `Sign up with ${provider.name}`;

            const baseStyles =
              "w-80 flex items-center justify-center gap-2 rounded-3xl px-4 py-3 font-medium shadow-lg transition-colors";

            if (provider.id === "google") {
              return (
                <button
                  key={provider.id}
                  onClick={() =>
                    signIn(provider.id, {
                      redirect: true,
                      callbackUrl: "/dashboard",
                    })
                  }
                  className={`${baseStyles} bg-darkOrange text-white hover:bg-orange-600`}
                >
                  <Image
                    src="/google-logo.svg"
                    alt="Google Logo"
                    width={24}
                    height={24}
                  />
                  <span>{buttonText}</span>
                </button>
              );
            } else if (provider.id === "github") {
              return (
                <button
                  key={provider.id}
                  onClick={() =>
                    signIn(provider.id, {
                      redirect: true,
                      callbackUrl: "/dashboard",
                    })
                  }
                  className={`${baseStyles} bg-gray-800 text-white hover:bg-gray-900`}
                >
                  <Image
                    src="/github-logo.svg"
                    alt="GitHub Logo"
                    width={24}
                    height={24}
                  />
                  <span>{buttonText}</span>
                </button>
              );
            }
            return null;
          })}
      </div>

      {/* Separator */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">or</span>
        </div>
      </div>

      {/* Credentials Form */}
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            {isLogin && (
              <span className="ml-auto text-sm underline hover:text-gray-700 cursor-pointer">
                Forgot your password?
              </span>
            )}
          </div>
          <Input id="password" name="password" type="password" required />
        </div>
        {errorMessage && (
          <p className="text-red-500 text-sm text-center">{errorMessage}</p>
        )}
        <Button
          type="submit"
          className="w-80 mx-auto shadow-xl rounded-3xl bg-darkOrange hover:bg-orange-600 text-white"
        >
          {isLogin ? "Login" : "Sign Up"}
        </Button>
        <p className="text-gray-600 mt-2 text-center">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-darkOrange underline cursor-pointer"
          >
            {isLogin ? "Sign up here" : "Log in here"}
          </span>
        </p>
      </form>
    </div>
  );
}
