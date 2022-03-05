import { fork } from "redux-saga/effects";
import authSaga from "./auth/saga";
import blogSaga from "./blogs/saga";

export default function* rootSaga() {
    yield fork(authSaga);
    yield fork(blogSaga);
}
