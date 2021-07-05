import React from "react";

import agent from "../../agent";

const GlobalFeedTab = ({ onTabClick, tab }) => {
  const clickHandler = (ev) => {
    ev.preventDefault();
    onTabClick("all", agent.Articles.all, agent.Articles.all());
  };

  return (
    <li className="nav-item">
      <a
        href=""
        className={tab === "all" ? "nav-link active" : "nav-link"}
        onClick={clickHandler}
      >
        Global Feed
      </a>
    </li>
  );
};

export default GlobalFeedTab;
