export const actionTypes = {
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGIN: 'LOGIN',
  REGISTER: 'REGISTER',
  REGISTER_FAILURE: 'REGISTER_FAILURE',
  SET_SESSION: 'SET_SESSION',
  GET_ME: 'GET_ME',
};

export function loginFailure(error) {
  return {
    type: actionTypes.LOGIN_FAILURE,
    error,
  };
}

export function login(formData) {
  return { type: actionTypes.LOGIN, payload: formData };
}

export function setAuth(user) {
  return { type: actionTypes.SET_SESSION, payload: user };
}

export function getMe() {
  return { type: actionTypes.GET_ME };
}

