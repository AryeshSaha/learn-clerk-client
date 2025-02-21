import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const VerifyEmail = ({ handleVerify, code, setCode }) => {
  return (
    <>
      <h1>Verify your email</h1>
      <form onSubmit={handleVerify}>
        <Label htmlFor="code">Enter your verification code</Label>
        <Input
          value={code}
          id="code"
          name="code"
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <Button type="submit" className="w-full">
          Verify
        </Button>
      </form>
    </>
  );
};

export default VerifyEmail;
