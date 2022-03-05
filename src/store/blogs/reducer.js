import { actionTypes } from './actions';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
  list: null,
  loading: false,
  error: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
     case HYDRATE:
      return {
        ...state,
        blogs: action.payload
    };
    case actionTypes.CREATE_BLOG:
      return {
        ...state,
        loading: true,
        error: null
    };
    case actionTypes.CREATE_BLOG_SUCCESS:
      return {
        ...state,
        list: action.payload,
        loading: false,
    };
    case actionTypes.CREATE_BLOG_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
    };
    case actionTypes.GET_BLOGS:
      return {
        ...state,
        loading: true,
    };
    case actionTypes.GET_BLOGS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        loading: false,
    };
    default: 
      return state;
  }
}

export default reducer;
