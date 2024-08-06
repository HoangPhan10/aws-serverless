import api from "@/service/http";
export const getUser = async () => {
  const apiData = await api.get("/users");
  return apiData;
};
