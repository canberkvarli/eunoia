"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";

export default function AuthModal({
  isOpen,
  onClose,
  isLoginView: parentIsLoginView,
}: {
  isOpen: boolean;
  onClose: () => void;
  isLoginView: boolean;
}) {
  const [isLoginView, setIsLoginView] = useState(parentIsLoginView);

  // Sync state when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsLoginView(parentIsLoginView);
    }
  }, [isOpen, parentIsLoginView]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-md p-6 rounded-lg">
        <DialogTitle>
          <motion.div
            key={isLoginView ? "login" : "signup"}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {isLoginView ? <LoginForm /> : <SignupForm />}
            <div className="text-center mt-4 font-light">
              {isLoginView
                ? "Don't have an account?"
                : "Already have an account?"}
              <button
                className={`ml-2 text-md underline ${
                  isLoginView ? "text-darkOrange" : null
                }`}
                onClick={() => setIsLoginView(!isLoginView)}
              >
                {isLoginView ? "Sign up" : "Log in"}
              </button>
            </div>
          </motion.div>
        </DialogTitle>
      </DialogContent>
    </Dialog>
  );
}
