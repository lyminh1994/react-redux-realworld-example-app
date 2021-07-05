import React from "react";
import { useDispatch } from "react-redux";

import agent from "../../agent";
import { DELETE_COMMENT } from "../../constants/actionTypes";

const DeleteButton = ({ slug, commentId, show }) => {
  const dispatch = useDispatch();

  const handelDelete = () => {
    dispatch({
      type: DELETE_COMMENT,
      payload: agent.Comments.delete(slug, commentId),
      commentId,
    });
  };

  if (show) {
    return (
      <span className="mod-options">
        <i className="ion-trash-a" onClick={handelDelete}></i>
      </span>
    );
  }

  return null;
};

export default DeleteButton;
