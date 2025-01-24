import { useState } from "react";

export default function useComments(commentsData) {
  const [comments, setComments] = useState(commentsData.comments);

  const addComment = (value, parentId) => {
    const newId = Date.now();
    const newComment = { id: newId, value, parentId, children: [] };
    setComments((prevComments) => {
      const updatedComment = { ...prevComments, [newId]: newComment };
      updatedComment[parentId].children.push(newId);
      return updatedComment;
    });
  };

  const deleteComment = (id) => {
    const parentId = comments[id].parentId;
    setComments((prevComments) => {
      const updatedComments = { ...prevComments };
      if (parentId) {
        updatedComments[parentId].children = updatedComments[
          parentId
        ].children.filter((childId) => {
          return childId !== id;
        });
      }
      const queue = [id];
      while (queue.length > 0) {
        const nodeToDelete = queue.shift();
        queue.push(...updatedComments[nodeToDelete].children);

        delete updatedComments[nodeToDelete];
      }
      return updatedComments;
    });
  };

  return { comments, deleteComment, addComment };
}
