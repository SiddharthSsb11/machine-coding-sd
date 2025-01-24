import CommentBox from "./components/CommentBox";
import "./styles.css";
import commentsData from "./commentsData.json";
import useComments from "./hooks/useComments";

export default function App() {
  const { comments, addComment, deleteComment } = useComments(commentsData);

  if (Object.keys(comments).length === 0) {
    return <h1>No Comments to show</h1>;
  }
  return (
    <CommentBox
      comment={comments[1]}
      allComments={comments}
      addComment={addComment}
      deleteComment={deleteComment}
    />
  );
}
