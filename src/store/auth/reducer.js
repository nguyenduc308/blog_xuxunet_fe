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
        error: action.payload,
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

    case actionTypes.REGISTER:
      return {
        ...state,
        loading: true,
    };

    case actionTypes.REGISTER_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
    };

    case actionTypes.GET_ME:
      return {
        ...state,
        loading: true,
    };

    case actionTypes.GET_ME_FAILURE:
      return {
        ...state,
        loading: false,
    };

    default:
      return state;
  }
}

export default reducer;
