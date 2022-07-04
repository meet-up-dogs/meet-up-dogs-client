import axios from "axios";
// let baseUrl = "http://localhost:8080/";
let baseUrl = "https://meet-up-dogs.herokuapp.com";

const axiosPublic = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

export { axiosPublic };
