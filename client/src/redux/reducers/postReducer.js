const initialState = {
  posts: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "GET_POSTS":
      return { ...state, posts: action.payload };
    case "CREATE_POSTS":
      return { ...state, posts: [action.payload, ...state.posts] };
    case "DELETE_POSTS":
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    default:
      return;
  };
};
