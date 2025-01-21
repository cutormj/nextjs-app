
import { doSocialLogin } from "@/actions/index";
import { Button } from "@/components/ui/button";
const SignIn: React.FC = () => {
  return (
    <form action={doSocialLogin}>
            <Button
              type="submit"
              name="action"
              value="google"
            >Sign In With Google</Button>
        </form>
  );
};

export default SignIn;
