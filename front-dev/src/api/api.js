import axios from "axios";

const defaultOptionsPatent = {
  baseURL: "http://192.168.11.57:18076/",
  // baseURL:"http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
};

let baseRoutPatent = axios.create(defaultOptionsPatent);

baseRoutPatent.interceptors.request.use(function (config) {
  const token = JSON.parse(localStorage.getItem("user")).access_token;
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export const unAuthorized = (error) => {
  if (error.toJSON().status === 401) {
    localStorage.clear("user");
    window.location.reload();
  } else {
    console.log(error.toJSON().status);
  }
};

export  const getRooms = () => {
  return baseRoutPatent
    .get(`/api/hostels/`)
    // .get(`/room`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      unAuthorized(error);
    }); 
};



export  const deleteRooms = (roomId) => {
  return baseRoutPatent
    .delete(`/room/${roomId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      unAuthorized(error);
    }); 
};


// export const getStudent = (id) => {
//   return baseRoutPatent
//     .post(`api/students/byGroup?id=${id}`)
//     .then((response) => {
//       return response.data;
//     })
//     .catch((error) => {
//       unAuthorized(error);
//     });
// };
