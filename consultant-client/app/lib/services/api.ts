import axios from "axios";
import toast from "react-hot-toast";
import { store } from "../redux";
import { setLoggin } from "../redux/slices/auth";

const API = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1`
});

API.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: any) => {
    // Do something with error response
    if(error.response.data.statusCode === 401){
      toast.error("Session expired");
      store.dispatch(setLoggin(null));
    }else{
      const message =
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
      toast.error(message);
    }
  }
);

export default API;
