import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, deletePost } from "../redux/actions/postActions";
import { Link } from "react-router-dom";

const PostList = ({ showActions = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div
          key={post._id}
          className="bg-white shadow-md rounded-lg p-5 border border-gray-200"
        >
          <h5 className="text-xl font-semibold text-gray-800 mb-2">
            <Link
              to={`/post/${post._id}`}
              className="hover:text-blue-600 transition"
            >
              {post.title}
            </Link>
          </h5>
          <p className="text-gray-700 mb-2">
            {post.content.substring(0, 100)}...
          </p>
          <p className="text-sm text-gray-500 mb-3">
            By {post.author.name}
          </p>

          {showActions && (
            <button
              onClick={() => dispatch(deletePost(post._id))}
              className="bg-red-600 text-white px-3 py-2 rounded-md shadow hover:bg-red-700 transition"
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default PostList;
