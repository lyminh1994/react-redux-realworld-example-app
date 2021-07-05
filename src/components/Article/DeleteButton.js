import React from "react";
import { connect } from "react-redux";

import agent from "../../agent";
import { DELETE_COMMENT } from "../../constants/actionTypes";

const mapDispatchToProps = (dispatch) => ({
  onClick: (payload, commentId) =>
    dispatch({ type: DELETE_COMMENT, payload, commentId }),
});

const DeleteButton = ({ slug, commentId, onClick, show }) => {
  const handelDelete = () => {
    const payload = agent.Comments.delete(slug, commentId);
    onClick(payload, commentId);
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

export default connect(() => ({}), mapDispatchToProps)(DeleteButton);
