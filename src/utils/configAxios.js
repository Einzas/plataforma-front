import axios from "axios";

export const axiosEcommerce = axios.create({
  //url base de la api
  baseURL: "http://localhost:3000/",
});

export const getConfig = () => {
  const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
