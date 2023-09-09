import axios from "axios";
import { backendBaseUrl } from "./common";

const axiosInstance = axios.create({
  baseURL: backendBaseUrl,
  timeout: 1000,
});

export default axiosInstance;
