import { Loader } from "@aws-amplify/ui-react";
type propsCustomLoading = {
  isLoading: boolean;
};

const CustomLoading = (props: propsCustomLoading) => {
  const { isLoading } = props;
  return (
    <>
      {isLoading ? (
        <div className="custom-loading">
          <Loader size="large" />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default CustomLoading;
