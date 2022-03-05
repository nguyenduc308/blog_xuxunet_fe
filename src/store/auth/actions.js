export const actionTypes = {
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGIN: 'LOGIN',
  SET_SESSION: 'SET_SESSION',

  REGISTER_FAILURE: 'REGISTER_FAILURE',
  REGISTER: 'REGISTER',

  GET_ME: 'GET_ME',
  GET_ME_FAILURE: 'GET_ME_FAILURE',
};

export function loginFailure(error) {
  return {
    type: actionTypes.LOGIN_FAILURE,
    payload: error,
  };
}

export function login(formData) {
  return { type: actionTypes.LOGIN, payload: formData };
}

export function register(formData) {
  return { type: actionTypes.REGISTER, payload: formData };
}

export function registerFailure(error) {
  return { type: actionTypes.REGISTER_FAILURE, payload: error };
}

export function setAuth(user) {
  return { type: actionTypes.SET_SESSION, payload: user };
}

export function getMe() {
  return { type: actionTypes.GET_ME };
}

export function getMeFailure() {
  return { type: actionTypes.GET_ME_FAILURE };
}

