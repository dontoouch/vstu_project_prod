import { SET_ROOMS , SET_ROOM, DELETE_ROOM, ADD_STUDENT } from "../types/mainTypes";

let initialState = {
  rooms: [],
};

const mainReducer = (state = initialState, action) => {
  
  switch (action.type) {
    case SET_ROOMS:
      return {
        ...state,
        rooms: [...action.rooms],
      };

      case SET_ROOM:
      console.log(action)
      return {
        ...state,
        rooms: [...action.rooms],
      };

      case ADD_STUDENT:
        console.log(state)
        console.log(action)
      return {
        ...state,
        rooms: [...state.rooms, ...action.rooms],
      };

      case DELETE_ROOM:
      return {
        ...state,
        rooms: [...action.rooms],
      };
    default:
      return state;
  }
};


export default mainReducer;
