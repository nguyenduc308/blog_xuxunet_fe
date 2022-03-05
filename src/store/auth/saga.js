import { all, put, takeLatest } from 'redux-saga/effects';
import http from '../../libs/http';
import { actionTypes, loginFailure, setAuth } from './actions';

function* login(action) {
  try {
    const res = yield http.post('/auth/login', action.payload);
    yield put(setAuth(res.data.user));
  } catch (err) {
    yield put(loginFailure(err));
  }
}

function* getMe(action) {
  try {
    const res = yield http.get('/users/profile');
    yield put(setAuth(res.data));
  } catch (err) {
  }
}

function* authSaga() {
  yield all([
    takeLatest(actionTypes.LOGIN, login),
    takeLatest(actionTypes.GET_ME, getMe),
  ]);
}

export default authSaga;
