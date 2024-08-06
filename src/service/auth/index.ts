import { JWT_ID_TOKEN } from "@/constance";
import Cookies from "js-cookie";

export function setUserCredential(id_token: any) {
  Cookies.set(JWT_ID_TOKEN, id_token);
}

export function removeUserCredential() {
  Cookies.remove(JWT_ID_TOKEN);
}

export function getIdToken() {
  return Cookies.get(JWT_ID_TOKEN);
}
