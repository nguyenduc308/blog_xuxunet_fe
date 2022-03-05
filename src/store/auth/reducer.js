import { actionTypes } from './actions';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
  error: false,
  user: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    // case HYDRATE:
    //   return {
    //     ...state,
    //     data: action.payload
    //   };
    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case actionTypes.SET_SESSION:
      return {
        ...state,
        user: action.payload,
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
