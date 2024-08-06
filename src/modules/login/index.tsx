import { curentAuthenticated } from "@/api/auth/current-authenticated-user";
import CustomLoading from "@/component/Loading";
import { setUserCredential } from "@/service/auth";
import { Authenticator } from "@aws-amplify/ui-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type HelloProps = {
  signOut: any;
  user: any;
};

export const Login = () => {
  const routes = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  function Hello(props: HelloProps) {
    useEffect(() => {
      setIsLoading(true);
      curentAuthenticated()
        .then((res: any) => {
          const { signInUserSession } = res;
          const idTokenNew = signInUserSession.idToken.jwtToken;
          setUserCredential(idTokenNew);
          routes.push("/");
        })
        .catch((err) => routes.push("/login"))
        .finally(() => setIsLoading(false));
    });

    return <CustomLoading isLoading={isLoading} />;
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
