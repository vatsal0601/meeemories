import axios from "axios";

const client = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000",
});

client.interceptors.response.use((response) => response.data.data);

export default client;
