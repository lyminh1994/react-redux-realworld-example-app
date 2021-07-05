import Comment from "./Comment";
import React from "react";

const CommentList = ({ comments, currentUser, slug }) => (
  <div>
    {comments.map((comment) => (
      <Comment
        key={comment.id}
        comment={comment}
        currentUser={currentUser}
        slug={slug}
      />
    ))}
  </div>
);

export default CommentList;
