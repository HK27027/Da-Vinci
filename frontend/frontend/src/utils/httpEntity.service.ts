import axios from "axios";

export const get = (url: string) => {
  return axios.get(url);
};

export const post = (url: string, body: object) => {
  return axios.post(url, body);
};

export const put = (url: string, body: object) => {
  return axios.put(url, body);
};

export const del = (url: string) => {
  return axios.delete(url);
};
