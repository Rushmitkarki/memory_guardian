import axios from "axios";

//creating backend config
const Api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const registerUserApi = (data) => Api.post("/api/user/create", data);

//Login API
export const loginUserApi = (data) => Api.post("/api/user/login", data);
// Create doctor
export const createDoctor = (data) => Api.post("/api/doctor/create", data);
//Route to fetch all doctor
export const getAllDoctors = () => Api.get("/api/doctor/get_all_doctors");
// FOr single doctor
export const getSingleDoctor = (id) => Api.get(`/api/doctor/get_single_doctor/${id}`);
// Update doctor
export const updateDoctor = (id, data) => Api.put(`/api/doctor/update_doctor/${id}`, data);
// Delete doctor
export const deleteDoctor = (id) => Api.delete(`/api/doctor/delete_doctor/${id}`);