import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const password2 = formData.get("password2") as string;

    if (password !== password2) {
      alert("Passwords do not match!");
      return;
    }

    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      alert("Signup failed. Please try again.");
      return;
    }

    alert("Signup successful! Redirecting...");
    // window.location.href = "/dashboard";
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome to Eunoia</CardTitle>
          <CardDescription>
            Sign up with your Apple or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button variant="outline" className="w-full">
                  Sign up with Apple
                </Button>
                <Button variant="outline" className="w-full">
                  Sign up with Google
                </Button>
              </div>
              <div className="relative text-center text-sm">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password2">Re-type Password</Label>
                  <Input
                    id="password2"
                    name="password2"
                    type="password"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Sign Up
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-center text-xs text-muted-foreground">
        By clicking continue, you agree to our{" "}
        <Link href="#">Terms of Service</Link> and{" "}
        <Link href="#">Privacy Policy</Link>.
      </div>
    </div>
  );
}
