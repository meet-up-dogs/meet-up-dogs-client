import axios from "axios";
let baseUrl = "http://localhost:8080";

const axiosPublic = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

export { axiosPublic };
