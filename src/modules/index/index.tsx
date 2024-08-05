import React, { useEffect, useState } from "react";
import { Amplify, API, Auth } from "aws-amplify";
import { useRouter } from "next/router";
import { Button } from "@aws-amplify/ui-react";
import { curentAuthenticated } from "@/api/auth/current-authenticated-user";
import CustomLoading from "@/component/Loading";

export const Index = () => {
  const routes = useRouter();
  const [idToken, setIdToken] = useState();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    curentAuthenticated()
      .then((res: any) => {
        const { attributes, signInUserSession } = res;
        const idTokenNew = signInUserSession.idToken.jwtToken;
        setIdToken(idTokenNew);
      })
      .catch((err) => routes.push("/login"));
  }, []);

  const apiName = "api-sls-az-dev";
  const path = "/users";
  const myInit = {
    headers: {
      Authorization: idToken,
    },
    body: {
      name: "Hoàng AWS",
    },
  };
  const callAPI = () => {
    setIsLoading(true);
    API.get(apiName, path, myInit)
      .then((response) => {
        setData(response.body);
      })
      .catch((error: any) => {
        console.error("error: ", error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const postAPI = () => {
    setIsLoading(true);
    API.post(apiName, path, myInit)
      .then((response) => {
        setData(response.body);
      })
      .catch((error: any) => {
        console.error("error: ", error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="grid place-items-center h-[100vh]">
      <div className="flex">
        {/* <CustomLoading isLoading={isLoading} /> */}
        <Button
          variation="primary"
          colorTheme="success"
          size="small"
          loadingText="Vui lòng chờ"
          isLoading={isLoading}
          onClick={callAPI}
        >
          GET API
        </Button>
        <p className="ml-5">Data: {data}</p>
      </div>
    </div>
  );
};