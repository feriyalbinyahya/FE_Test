import apiClient from "./apiClient";

export const getLalins = async (tanggal) => {
  const res = await apiClient.get("/lalins", {
    params: { tanggal },
  });
  return res.data;
};