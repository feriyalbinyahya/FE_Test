import axios from "axios";

import apiClient from "./apiClient";

export const getGerbangs = async () => {
  const res = await apiClient.get("/gerbangs");
  return res.data;
};

export const createGerbang = async (data) => {
  return await apiClient.post("/gerbangs", data);
};

export const updateGerbang = async (data) => {
  return await apiClient.put("/gerbangs/", data);
};

export const deleteGerbang = async (data) => {
  return await apiClient.delete("/gerbangs/", { data });
};