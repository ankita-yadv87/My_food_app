import { createStore } from "redux";
import rootReducer from "./components/redux/reducers/main";

const store = createStore(
    rootReducer
);

export default store;
