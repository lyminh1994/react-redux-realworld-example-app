import React, { useState } from "react";
import { useDispatch } from "react-redux";

import agent from "../../agent";
import { ADD_COMMENT } from "../../constants/actionTypes";

const CommentInput = ({ slug, currentUser }) => {
  const dispatch = useDispatch();
  const [body, setBody] = useState("");

  const createComment = (ev) => {
    ev.preventDefault();

    setBody("");
    dispatch({
      type: ADD_COMMENT,
      payload: agent.Comments.create(slug, {
        body,
      }),
    });
  };

  return (
    <form className="card comment-form" onSubmit={createComment}>
      <div className="card-block">
        <textarea
          className="form-control"
          placeholder="Write a comment..."
          value={body}
          onChange={(ev) => {
            setBody(ev.target.value);
          }}
          rows="3"
        ></textarea>
      </div>
      <div className="card-footer">
        <img
          src={currentUser.image}
          className="comment-author-img"
          alt={currentUser.username}
        />
        <button className="btn btn-sm btn-primary" type="submit">
          Post Comment
        </button>
      </div>
    </form>
  );
};

export default CommentInput;
