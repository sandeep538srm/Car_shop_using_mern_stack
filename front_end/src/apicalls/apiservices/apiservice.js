import axios from "axios";
import url from "../url"; // Adjust the import path if needed

export const fetchProducts = () => {
  return axios.get(url + "/fetchproduct");
};

export const insertProduct = (product) => {
  return axios.post(url + "/insertproduct", product);
};

export const updateProduct = (product) => {
  return axios.put(url + "/updateproduct", product);
};

export const deleteProduct = (productId) => {
  return axios.delete(url + "/deleteproduct", { data: { p_id: productId } });
};
