import {SET_ROOMS , SET_ROOM , DELETE_ROOM, ADD_STUDENT } from "../types/mainTypes";
// import {SET_ROOMS, SET_STUDENTS } from "../types/mainTypes";
export const setRooms = (rooms) => ({
  type: SET_ROOMS,
  rooms: rooms,
});
export const setRoom = (rooms) => ({
  type: SET_ROOM,
  rooms: rooms,
});

export const addStudent = (roomStudent) => ({
  type: ADD_STUDENT,
  rooms: roomStudent,
});

export const deleteRooms = (rooms) => ({
  type: DELETE_ROOM,
  rooms: rooms,
});

// export const setStudent = (students) => ({
//   type: SET_STUDENTS,
//   students: students,
// });
