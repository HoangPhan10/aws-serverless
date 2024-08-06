import { getUser } from "@/api/user/get-user";
import { postUser } from "@/api/user/post-user";
import { Button } from "@aws-amplify/ui-react";
import { useRouter } from "next/router";
import { useState } from "react";
type dataUser = {
  name: string;
  age: number;
};

type dataProduct = {
  name: string;
  price: number;
};

export const Index = () => {
  const routes = useRouter();
  const [data, setData] = useState<[dataUser]>();
  const [dataProduct, setDataProduct] = useState<[dataProduct]>();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingProduct, setIsLoadingProduct] = useState(false);

  const callAPI = () => {
    setIsLoading(true);
    getUser()
      .then((response) => {
        console.log(response,"response");
        setData(response.data);
      })
      .catch((error: any) => {
        console.log("error", error);
        setData(undefined);
        // routes.push("/auth/login");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const callAPIProduct = () => {
    setIsLoadingProduct(true);
    const body = {
      // id: "12",
      username: "hoangaws",
      email: "hoangaws@gmail.com"
    }
    postUser(body)
      .then((response) => {
        console.log("response", response);
      })
      .catch((error: any) => {
        console.log("error", error.response.data.message);
        setDataProduct(undefined);
        // routes.push("/auth/login");
      })
      .finally(() => {
        setIsLoadingProduct(false);
      });
  };

  return (
    <div className="grid place-items-center h-[100vh]">
      {/* <CustomLoading isLoading={isLoading} /> */}
      <div className="flex">
        <Button
          variation="primary"
          colorTheme="success"
          size="small"
          loadingText="Vui lòng chờ"
          isLoading={isLoading}
          onClick={callAPI}
        >
          GET API USER
        </Button>
        {data?.map((e: dataUser, index: number) => {
          return (
            <p
              key={index}
              className="ml-5"
            >{`Name: ${e.name}, age: ${e.age}`}</p>
          );
        })}
      </div>
      <div className="flex">
        <Button
          variation="primary"
          colorTheme="success"
          size="small"
          loadingText="Vui lòng chờ"
          isLoading={isLoadingProduct}
          onClick={callAPIProduct}
        >
          GET API PRODUCT
        </Button>
      </div>
    </div>
  );
};
