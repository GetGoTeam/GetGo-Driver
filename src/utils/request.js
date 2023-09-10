import axios from "axios";

const baseURL = "http://192.168.1.20";

const request = axios.create({
  baseURL: `${baseURL}:3000/api/drivers/`,
});

export { baseURL };
export default request;
