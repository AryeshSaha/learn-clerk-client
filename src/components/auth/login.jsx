import { cn } from "@/src/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import { useState } from "react";
import { useSignIn } from "@clerk/clerk-react";
import { toast } from "sonner";
import { useNavigate, useSearchParams } from "react-router";

export function LoginForm({ className, ...props }) {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [query] = useSearchParams();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "email") setEmail(e.target.value);
    else if (e.target.name === "password") setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      `Login form submitted with values: \nemail: ${email} & password: ${password}`
    );
    setLoading(true);

    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        setEmail("");
        setPassword("");
        const redirectTo = query.get("redirectTo") || "/";
        setTimeout(() => {
          console.log("Redirecting to:", redirectTo);
          navigate(redirectTo, { replace: true });
          setLoading(false);
        }, 100);
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.errors[0].message);
      console.error(JSON.stringify(error, null, 2));
      setLoading(false)
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name={"email"}
                  value={email}
                  onChange={handleChange}
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  name={"password"}
                  value={password}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                    Logging in...
                  </span>
                ) : (
                  "Login"
                )}
              </Button>
              <Button variant="outline" className="w-full">
                Sign-In with Github
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginForm;
