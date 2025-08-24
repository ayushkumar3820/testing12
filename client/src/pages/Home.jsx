import React from "react";
import PostList from "../components/PostList";

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Welcome to MERN Blog
      </h1>
      <PostList />
    </div>
  );
};

export default Home;
