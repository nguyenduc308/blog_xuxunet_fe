export const actionTypes = {
  CREATE_BLOG: 'CREATE_BLOG',
  CREATE_BLOG_SUCCESS: 'CREATE_BLOG_SUCCESS',
  CREATE_BLOG_FAILURE: 'CREATE_BLOG_FAILURE',

  GET_BLOGS: 'GET_BLOGS',
  GET_BLOGS_SUCCESS: 'GET_BLOGS_SUCCESS',
};

export function createBlog(formData) {
  return {
    type: actionTypes.CREATE_BLOG,
    payload: formData,
  };
}
export function createBlogFailure(error) {
  return {
    type: actionTypes.CREATE_BLOG_FAILURE,
    payload: error,
  };
}
export function createBlogSuccess(payload) {
  return {
    type: actionTypes.CREATE_BLOG_SUCCESS,
    payload: payload,
  };
}


export function getBlogs(formData) {
  return {
    type: actionTypes.GET_BLOGS,
  };
}

export function getBlogSuccess(list) {
  return {
    type: actionTypes.GET_BLOGS_SUCCESS,
    payload: list,
  };
}