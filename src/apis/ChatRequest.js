import axios from "axios";
import { server } from "../redux/store";

const API = axios.create({ baseURL: `${server}/api/chat` });

export const userChats = (id) => API.get(`/${id}`);

export const getDetails = (id) => API.get(`/detail/${id}`);
