import { Auth } from "aws-amplify";

export const curentAuthenticated = async () => {
  try {
    const user = await Auth.currentAuthenticatedUser();

    const { attributes, signInUserSession } = user;
    return { attributes, signInUserSession };
  } catch (error) {
    console.error(error);
    return null;
  }
};
