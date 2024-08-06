import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Amplify } from "aws-amplify";
import { configAmplify } from "@/config/config-amplify";
import "@aws-amplify/ui-react/styles.css";
Amplify.configure(configAmplify);
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
