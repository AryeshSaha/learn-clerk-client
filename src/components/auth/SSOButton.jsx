import { useSignIn } from "@clerk/clerk-react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { cn } from "@/src/lib/utils";

const SSOButton = ({ children, provider, redirectTo, classname }) => {
  const { signIn } = useSignIn();
  const strategies = {
    google: "oauth_google",
    github: "oauth_github",
    facebook: "oauth_facebook",
  };
  const handleOAuthSignIn = async () => {
    try {
      await signIn.authenticateWithRedirect({
        strategy: strategies[provider.toLowerCase()],
        redirectUrl: `${
          import.meta.env.VITE_AUTH_CALLBACK_URL
        }?redirectTo=${redirectTo}`,
        redirectUrlComplete: `${redirectTo}`,
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
        className={cn("w-full capitalize cursor-pointer", classname)}
        onClick={handleOAuthSignIn}
      >
        {children}
      </Button>
    </>
  );
};

export default SSOButton;
