//  api/koalas
import api from "./axios";

export const getAllKoalas = async () => {
  const response  = await api.get( "/koalas" );
  return response.data.data;
};


export const getKoalaById = async (id) => {
  const response = await api.get( `/koalas/${id}` );
  return response.data.data;
};


export const createKoala = async (formData) => {
  const { data } = await api.post(
    "/koalas",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );

  return data;
};


export const updateKoala = async (id, formData) => {
  // Pass formData directly as the body payload
  const response = await api.put(`/koalas/${id}`, formData);
  return response.data;
};


export const deleteKoala = async (id) => {
  const response = await api.delete( `/koalas/${id}` );
  return response.data;
};