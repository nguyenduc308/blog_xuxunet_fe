import { all, put, takeLatest } from 'redux-saga/effects';
import http from '../../libs/http';
import { actionTypes, createBlogSuccess, createBlogFailure, getBlogSuccess } from './actions';

function* createblog(action) {
  try {
    const res = yield http.post('/blogs', action.payload);

    yield put(createBlogSuccess(res.data.user));
  } catch (err) {
    
    yield put(createBlogFailure(err));
  }
}

function* getblogs(action) {
  try {
    const res = yield http.get('/blogs');

    yield put(getBlogSuccess(res.data));
  } catch (err) {
  }
}

function* blogSaga() {
  yield all([
    takeLatest(actionTypes.CREATE_BLOG, createblog),
    takeLatest(actionTypes.GET_BLOGS, getblogs),
  ]);
}

export default blogSaga;
