import axios from "axios";

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:5000/api/post");
    dispatch({ type: "GET_POSTS", payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export const createPost = (postData) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:5000/api/post", postData);
    dispatch({ type: "CREATE_POST", payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    const res = await axios.delete("http://localhost:5000/api/post", deletePost);
    dispatch({ tpe: "DELETE_POST", payload: res.data });
  } catch (err) {
    console.error(err);
  }
};
