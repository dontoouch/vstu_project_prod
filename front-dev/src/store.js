import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import mainReducer from "./redux/reducers/mainReducers";

let reducers = combineReducers({
  mainPage: mainReducer,
});

let store = createStore(reducers, compose(applyMiddleware(thunkMiddleware)));
export default store;
