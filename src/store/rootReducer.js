import { combineReducers } from "redux";
import auth from './auth/reducer';
import blogs from './blogs/reducer';

export default combineReducers({
    auth,
    blogs,
});