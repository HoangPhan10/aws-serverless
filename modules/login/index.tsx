import { configAmplify } from "@/config/config-amplify";
import { Authenticator, Button } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify, Auth } from "aws-amplify";
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
    return (
      <div>
        <h1>Hello {props.user?.username}</h1>
        <Button onClick={props.signOut}>Sign Out</Button>
      </div>
    );
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
