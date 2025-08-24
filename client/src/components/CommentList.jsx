import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getComments } from '../redux/actions/commentActions';
import io from '../socket';

const CommentList = ({ postId }) => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comment.comments);
  const [realTimeComments, setRealTimeComments] = useState(comments);

  useEffect(() => {
    dispatch(getComments(postId));
  }, [dispatch, postId]);

  useEffect(() => {
    setRealTimeComments(comments);
  }, [comments]);

  useEffect(() => {
    io.on('commentAdded', (newComment) => {
      if (newComment.post === postId) {
        setRealTimeComments((prev) => [newComment, ...prev]);
      }
    });

    return () => {
      io.off('commentAdded');
    };
  }, [postId]);

  return (
    <div>
      {realTimeComments.map((comment) => (
        <div
          key={comment._id}
          className="bg-white shadow-md rounded-lg p-4 mb-2 border border-gray-200"
        >
          <p className="text-gray-800">{comment.text}</p>
          <small className="text-gray-500">By {comment.user.name}</small>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
