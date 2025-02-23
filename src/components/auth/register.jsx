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
import { useReducer, useState } from "react";
import { useSignUp } from "@clerk/clerk-react";
import VerifyEmail from "./verifyEmail";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import SSOButton from "./SSOButton";

const initialState = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  cpassword: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return initialState;
    default:
      return initialState;
  }
};

export function RegisterForm({ className, ...props }) {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [error, setError] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const [query] = useSearchParams();
  const redirectTo = query.get("redirectTo") || "/";

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "UPDATE", field: name, value });

    if (name === "cpassword") {
      if (value !== state.password) setError("Passwords don't match");
      else setError("");
    }
    if (name === "password") {
      if (value !== state.cpassword) setError("Passwords don't match");
      else setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoaded) return;

    const { first_name, last_name, email, password } = state;
    if (error) {
      console.error(error);
      return;
    }

    try {
      await signUp.create({
        emailAddress: email,
        firstName: first_name,
        lastName: last_name,
        password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setVerifying(true);
      dispatch({ type: "RESET" });
    } catch (error) {
      toast.error(error?.errors[0]?.message);
      console.error(JSON.stringify(error, null, 2));
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        navigate("/account-details");
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (error) {
      console.error("Error: ", JSON.stringify(error, null, 2));
    }
  };

  if (verifying)
    return (
      <VerifyEmail handleVerify={handleVerify} code={code} setCode={setCode} />
    );

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>
            Enter your details below to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex gap-2">
                <div className="grid gap-2">
                  <Label htmlFor="first_name">First Name</Label>
                  <Input
                    id="first_name"
                    type="text"
                    name="first_name"
                    value={state.first_name}
                    onChange={handleChange}
                    placeholder="John"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    id="last_name"
                    type="text"
                    name="last_name"
                    value={state.last_name}
                    onChange={handleChange}
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={state.email}
                  onChange={handleChange}
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={state.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cpassword">Confirm Password</Label>
                <Input
                  id="cpassword"
                  type="password"
                  name="cpassword"
                  value={state.cpassword}
                  onChange={handleChange}
                  required
                />
                {error && <div style={{ color: "red" }}>{error}</div>}
              </div>
              <div id="clerk-captcha"></div>
              <Button type="submit" className="w-full">
                Continue
              </Button>
              <SSOButton
                mode="sign-up"
                provider={"Google"}
                redirectTo={redirectTo}
              />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default RegisterForm;
