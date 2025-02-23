import { useSignIn, useSignUp } from "@clerk/clerk-react";
import { toast } from "sonner";
import { Button } from "../ui/button";

const SSOButton = ({ mode, provider, redirectTo }) => {
  const { signUp } = useSignUp();
  const { signIn } = useSignIn();
  const strategies = {
    google: "oauth_google",
    github: "oauth_github",
    facebook: "oauth_facebook",
  };
  const handleOAuthSignIn = async () => {
    const authInstance = mode === "sign-in" ? signIn : signUp;

    try {
      await authInstance.authenticateWithRedirect({
        strategy: strategies[provider.toLowerCase()],
        redirectUrl: `${
          import.meta.env.VITE_AUTH_CALLBACK_URL
        }?redirectTo=${redirectTo}`,
      });
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
      toast.error(error.errors[0].message);
    }
  };
  return (
    <>
      <Button
        variant="outline"
        className="w-full capitalize cursor-pointer"
        onClick={handleOAuthSignIn}
      >
        Sign-Up with {provider}
      </Button>
    </>
  );
};

export default SSOButton;
