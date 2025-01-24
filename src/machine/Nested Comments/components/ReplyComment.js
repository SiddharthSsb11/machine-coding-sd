import { useState } from "react";

export default function ReplyComment({ id, setShowReplyBox, addComment }) {
  const [reply, setReply] = useState("");
  const handlePostReply = () => {
    addComment(reply, id);
    setReply("");
    setShowReplyBox(false);
  };
  return (
    <div className="reply-form ">
      <textarea
        className="reply-textarea"
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        placeholder="Write your reply here..."
      ></textarea>
      <button className="post-reply-btn" onClick={handlePostReply}>
        Post Reply
      </button>
    </div>
  );
}
