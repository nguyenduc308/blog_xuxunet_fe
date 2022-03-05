import { all, put, takeLatest } from 'redux-saga/effects';
import http from '../../libs/http';
import { actionTypes, getMeFailure, loginFailure, registerFailure, setAuth } from './actions';

function* login(action) {
  try {
    const res = yield http.post('/auth/login', action.payload);
    yield put(setAuth(res.data.user));
  } catch (err) {
    yield put(loginFailure(err));
  }
}

function* register(action) {
  try {
    const res = yield http.post('/auth/register', action.payload);
    
    yield put(setAuth(res.data.user));
  } catch (err) {
    yield put(registerFailure(err));
  }
}

function* getMe(action) {
  try {
    const res = yield http.get('/users/profile');
    yield put(setAuth(res.data));
  } catch (err) {

    yield put(getMeFailure())
  }
}

function* logout(action) {
  try {
    const res = yield http.post('/auth/logout');
    yield put(setAuth(null));
  } catch (err) {
  }
}

function* authSaga() {
  yield all([
    takeLatest(actionTypes.LOGIN, login),
    takeLatest(actionTypes.REGISTER, register),
    takeLatest(actionTypes.GET_ME, getMe),
    takeLatest(actionTypes.LOGOUT, logout),
  ]);
}

export default authSaga;
