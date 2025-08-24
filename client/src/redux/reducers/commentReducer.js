const initialState = {
  comments: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "GET_COMMENTS":
      return { ...state, comments: action.payload };
    case "CREATE_COMMENTS":
      return { ...state, comments: action.payload, ...state.comments };
      default:
        return state;
  }
}
