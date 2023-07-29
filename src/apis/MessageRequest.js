import axios from "axios";
import { server } from "../redux/store";

const API = axios.create({ baseURL: `${server}/api/message` });

export const getMessages = (id) => API.get(`/${id}`);
export const addMessage = (data) => API.post("/", data);
export const getLatestMessage = (id) => API.get(`/newMessage/${id}`);
