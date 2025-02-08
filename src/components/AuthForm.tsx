"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ClientSafeProvider, signIn } from "next-auth/react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface AuthFormProps {
  providers?: Record<string, ClientSafeProvider>;
  className?: string;
}

export default function AuthForm({ providers, className }: AuthFormProps) {
  const searchParams = useSearchParams();
  const initialMode = searchParams.get("mode") === "signup" ? false : true;
  const [isLogin, setIsLogin] = useState(initialMode);

  useEffect(() => {
    const mode = searchParams.get("mode");
    if (mode === "signup") {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [searchParams]);

  return (
    <div className={cn("flex flex-col gap-6 w-[20rem] mx-auto", className)}>
      <div className="flex flex-col items-center">
        <Image
          src="https://static.accelerator.net/134/0.51.2/images/thinker.svg"
          alt="Thinker logo"
          width={55}
          height={55}
        />
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

      <div className="flex flex-col items-center gap-2">
        {providers &&
          Object.values(providers).map((provider) => {
            // Skip the credentials provider since it’s handled via the form
            if (provider.id === "credentials") return null;

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
      <p className="text-gray-600 mt-2 text-center">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <span
          onClick={() => setIsLogin(!isLogin)}
          className="text-darkOrange underline cursor-pointer"
        >
          {isLogin ? "Sign up here" : "Log in here"}
        </span>
      </p>
    </div>
  );
}
