import axios from "axios";
const http = axios.create({
  baseURL: "https://ebook.vstu.by/authorization",
  headers: {
    Authorization: "Basic RElQTE9NQUZPUk1TOkRJUExPTUFGT1JNUw==",
  },
});

http.interceptors.response.use((response) => response.data);

export function getToken(data) {
  return http.post("/token?grant_type=password", data);
}
