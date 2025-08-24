import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/api/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPost();
  }, [id]);

  if (!post)
    return (
      <div className="text-center py-10 text-gray-500 text-lg">Loading...</div>
    );

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg border border-gray-200">
      {/* Post Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>

      {/* Post Content */}
      <p className="text-gray-700 mb-6">{post.content}</p>

      {/* Author Info */}
      <div className="flex items-center space-x-3 mb-8">
        <img
          src={post.author.avatar}
          alt="avatar"
          className="w-10 h-10 rounded-full border"
        />
        <small className="text-gray-600">By {post.author.name}</small>
      </div>

      {/* Comments Section */}
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Comments</h3>
      <CommentList postId={id} />

      {/* Add Comment */}
      <div className="mt-6">
        <CommentForm postId={id} />
      </div>
    </div>
  );
};

export default PostDetail;
