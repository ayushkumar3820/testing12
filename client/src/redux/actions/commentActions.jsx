import axios from "axios";

export const getComments = (postId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/comment/${postId}`);
    dispatch({ type: "GET_COMMENTS", payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export const createComment = (postId, commentData) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/comment/${postId}`, commentData);
    dispatch({ type: "CREATE_COMMENT", payload: res.data });
    return res.data; // For socket
  } catch (err) {
    console.error(err);
  }
};
