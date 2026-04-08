import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const fetchPostData = (pageNumber) => {
  return api.get(`/posts?_start=${pageNumber}&_limit=3`);
};

export const fecthPostIndv = async (id) => {
  try {
    const res = await api.get(`/posts/${id}`);
    return res.status === 200 ? res.data : [];
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => {
  return api.delete(`/posts/${id}`);
};
