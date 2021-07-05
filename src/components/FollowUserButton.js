import React from "react";

const FollowUserButton = ({ isUser, user, unfollow, follow }) => {
  let classes = "btn btn-sm action-btn";
  if (user.following) {
    classes += " btn-secondary";
  } else {
    classes += " btn-outline-secondary";
  }

  const handleClick = (ev) => {
    ev.preventDefault();
    if (user.following) {
      unfollow(user.username);
    } else {
      follow(user.username);
    }
  };

  if (isUser) {
    return null;
  }

  return (
    <button className={classes} onClick={handleClick}>
      <i className="ion-plus-round"></i>
      &nbsp;
      {user.following ? "Unfollow" : "Follow"} {user.username}
    </button>
  );
};

export default FollowUserButton;
