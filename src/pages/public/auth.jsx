import LoginForm from "@/src/components/auth/login";
import RegisterForm from "@/src/components/auth/register";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const Auth = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoaded && isSignedIn) navigate("/");
  }, [isLoaded, isSignedIn, navigate]);

  return (
    <>
      <div className="flex justify-center items-center h-full">
        <Tabs defaultValue="login" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm />
          </TabsContent>
          <TabsContent value="register">
            <RegisterForm />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Auth;
