import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { Toaster } from "sonner";

const clerkPbKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPbKey) {
  throw new Error("Missing Clerk Publishable Key");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={clerkPbKey} afterSignOutUrl={"/"}>
      <App />
      <Toaster />
    </ClerkProvider>
  </StrictMode>
);
