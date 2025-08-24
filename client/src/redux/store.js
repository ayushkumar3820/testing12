import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootRouter from "./reducers";

const store = createStore(rootRouter, applyMiddleware(thunk));

export default store;
