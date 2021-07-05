import React from "react";

import agent from "../../agent";

const YourFeedTab = ({ token, onTabClick, tab }) => {
  if (token) {
    const clickHandler = (ev) => {
      ev.preventDefault();
      onTabClick("feed", agent.Articles.feed, agent.Articles.feed());
    };

    return (
      <li className="nav-item">
        <a
          href=""
          className={tab === "feed" ? "nav-link active" : "nav-link"}
          onClick={clickHandler}
        >
          Your Feed
        </a>
      </li>
    );
  }
  return null;
};

export default YourFeedTab;
