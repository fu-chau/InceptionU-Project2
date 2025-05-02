import { useState, useEffect } from 'react';
import './CommentSection.css';

const CommentSection = ({ videoId, onCommentChange }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/comments/${videoId}`);
      const data = await res.json();
      setComments(data);
    } catch (err) {
      console.error('Failed to load comments', err);
    }
  };

  useEffect(() => {
    if (videoId) fetchComments();
  }, [videoId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      setLoading(true);
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ videoId, text })
      });

      const newComment = await res.json();
      setComments([newComment, ...comments]);
      setText('');
      onCommentChange?.(comments.length + 1);
    } catch (err) {
      console.error('Failed to add comment', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (commentId) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const updated = comments.filter((c) => c._id !== commentId);
      setComments(updated);
      onCommentChange?.(updated.length);
    } catch (err) {
      console.error('Failed to delete comment', err);
    }
  };

  return (
    <div className="comment-section">
      <form onSubmit={handleSubmit} className="comment-form">
        <input
          type="text"
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={loading}
        />
        <button type="submit" disabled={loading || !text.trim()}>Post</button>
      </form>

      <div className="comment-list">
        {comments.map((c) => (
          <div key={c._id} className="comment-item">
            <strong>{c.username}</strong>: {c.text}
            <span className="comment-delete" onClick={() => handleDelete(c._id)}>✖</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;