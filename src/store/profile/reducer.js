import { actionTypes } from './actions';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
  error: false,
  token: '',
  user: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case HYDRATE: 
      return {
        ...state,
        data: action.payload
      };
    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        token: action.payload,
        loading: false,
      };

    case actionTypes.LOGIN:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
}

export default reducer;
