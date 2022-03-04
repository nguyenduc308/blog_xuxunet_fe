export const actionTypes = {
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGIN: 'LOGIN',
  REGISTER: 'REGISTER',
  REGISTER_FAILURE: 'REGISTER_FAILURE',
  SET_TOKEN: 'SET_TOKEN'
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

export function setToken(token) {
  return { type: actionTypes.SET_TOKEN, payload: token };
}
