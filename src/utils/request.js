import axios from "axios";

const request = axios.create({
  baseURL: "http://192.168.1.20:3000/api/drivers/",
});

export default request;
