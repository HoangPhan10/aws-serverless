import axios from "axios";
import { Auth } from "aws-amplify";

// Tạo instance của Axios
const api = axios.create({
  baseURL: "https://2amecvjjcb.execute-api.us-east-1.amazonaws.com/dev", // Thay thế bằng endpoint API của bạn
});

api.interceptors.request.use(
  async (config) => {
    try {
      // Lấy token từ Amplify Auth
      const session = await Auth.currentSession();
      const token = session.getIdToken().getJwtToken();

      // Thêm token vào headers
      config.headers.Authorization = `${token}`;
    } catch (error) {
      console.error("Error getting token:", error);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    if (error.response.status === 401) {
      // Chuyển hướng về trang đăng nhập nếu nhận được lỗi 401
      await Auth.signOut();
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

export default api;
