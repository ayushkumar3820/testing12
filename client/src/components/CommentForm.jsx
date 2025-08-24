import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createComment } from '../redux/actions/commentActions';
import io from '../socket';

const CommentForm = ({ postId }) => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createComment(postId, { text })).then((newComment) => {
      io.emit('newComment', newComment);
    });
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
          placeholder="Add a comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
      >
        Comment
      </button>
    </form>
  );
};

export default CommentForm;
