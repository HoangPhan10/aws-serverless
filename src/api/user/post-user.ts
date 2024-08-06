import api from "@/service/http";
type BodyUser = {
  id?: string;
  username: string;
  email: string;
};
export const postUser = async (body: BodyUser) => {
  const apiData = await api.post("/users", body);
  return apiData;
};
