import axios from "axios";
import { useRootStore } from "@/stores/root";
const rootStore = useRootStore();
const baseUrl = rootStore.baseUrl;

// const baseUrl = import.meta.env.VITE_APP_BASE_URL;

const httpOptions = {
  baseURL: `${baseUrl}`,
  header: {
    "Content-type": "application/json",
  },
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
};

const HttpClient = axios.create(httpOptions);
export default HttpClient;
