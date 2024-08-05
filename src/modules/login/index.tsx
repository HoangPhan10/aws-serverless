import CustomLoading from "@/component/Loading";
import { configAmplify } from "@/config/config-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import { useRouter } from "next/router";

Amplify.configure(configAmplify);

type HelloProps = {
  signOut: any;
  user: any;
};

export const Login = () => {
  const routes = useRouter();

  function Hello(props: HelloProps) {
    routes.push("/");
    return <></>;
  }

  return (
    <div className="place-items-center grid h-[100vh] background-login">
      <Authenticator
        loginMechanisms={["username", "email"]}
        signUpAttributes={["email"]}
        socialProviders={["facebook", "google"]}
      >
        {({ signOut, user }) => {
          return <Hello signOut={signOut} user={user} />;
        }}
      </Authenticator>
    </div>
  );
};
