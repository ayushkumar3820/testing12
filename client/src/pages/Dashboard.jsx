import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import AuthContext from "../context/authContext";

const Dashboard = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div className="text-center py-10 text-gray-500">Loading...</div>;
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Create a Post</h2>
        <PostForm />
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your Posts</h2>
        <PostList showActions={true} />
      </div>
    </div>
  );
};

export default Dashboard;
