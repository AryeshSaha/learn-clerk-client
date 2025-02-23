import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import { useSearchParams } from "react-router";

const OAuthCallback = () => {
  const [query] = useSearchParams();
  const redirectTo = query.get("redirectTo") || "/";
  return (
    <>
      <AuthenticateWithRedirectCallback
        signInForceRedirectUrl={`${redirectTo}`}
        signUpForceRedirectUrl={`${redirectTo}`}
      />
    </>
  );
};

export default OAuthCallback;
