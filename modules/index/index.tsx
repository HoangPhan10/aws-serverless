import React, { useEffect, useState } from "react";
import { Amplify, API, Auth } from "aws-amplify";
import { useRouter } from "next/router";
import { Button } from "@aws-amplify/ui-react";

export const Index = () => {
  const routes = useRouter();
  const [idToken, setIdToken] = useState();
  const [data, setData] = useState();
  const curentAuthenticated = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();

      const { attributes, signInUserSession } = user;
      return { attributes, signInUserSession };
    } catch (error) {
      console.error(error);
      return null;
    }
  };
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
      "x-api-key": "NFIS5fmvXd4d3yMseg7ADa0KMqtXKSQJ5jlAZeJ2",
    },
    body: {
      name: "Hoàng AWS"
    }
    // response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
    // queryStringParameters: {
    //   name: "param", // OPTIONAL
    // },
  };
  const callAPI = () => {
    API.get(apiName, path, myInit)
      .then((response) => {
        setData(response.body);
      })
      .catch((error: any) => {
        console.error("error: ", error.message);
      });
  };

  const postAPI = () => {
    API.post(apiName, path, myInit)
      .then((response) => {
        setData(response.body);
      })
      .catch((error: any) => {
        console.error("error: ", error.message);
      });
  };

  return (
    <div className="grid place-items-center h-[100vh]">
      <div>
        <Button onClick={callAPI}>GET API</Button>
        <p>{data}</p>
        <Button onClick={postAPI}>POST API</Button>
        <p>{data}</p>
      </div>
    </div>
  );
};
