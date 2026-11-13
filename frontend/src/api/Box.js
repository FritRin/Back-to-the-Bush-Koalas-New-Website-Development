import api from "./axios";

export const getAllBox = async () => {
  const response  = await api.get( "/box-story" );
  return response.data.data;
};


export const getBoxId = async (id) => {
  const response = await api.get( `/box-story/${id}` );
  return response.data.data;
};


export const createBox = async (boxData) => {
  const { data } = await api.post("/box-story", boxData);
  return data;
};


export const updateBox = async (id, formData) => {
  // Pass formData directly as the body payload
  const response = await api.put(`/box-story/${id}`, formData);
  return response.data;
};


export const deleteBox = async (id) => {
  const response = await api.delete( `/box-story/${id}` );
  return response.data;
};