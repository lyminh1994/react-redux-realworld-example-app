import React from "react";
import { connect } from "react-redux";

import { CHANGE_TAB } from "../../constants/actionTypes";
import ArticleList from "../ArticleList";
import YourFeedTab from "./YourFeedTab";
import GlobalFeedTab from "./GlobalFeedTab";
import TagFilterTab from "./TagFilterTab";

const mapStateToProps = (state) => ({
  ...state.articleList,
  tags: state.home.tags,
  token: state.common.token,
});

const mapDispatchToProps = (dispatch) => ({
  onTabClick: (tab, pager, payload) =>
    dispatch({ type: CHANGE_TAB, tab, pager, payload }),
});

const MainView = ({
  token,
  tab,
  onTabClick,
  tag,
  pager,
  articles,
  loading,
  articlesCount,
  currentPage,
}) => {
  return (
    <div className="col-md-9">
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">
          <YourFeedTab token={token} tab={tab} onTabClick={onTabClick} />

          <GlobalFeedTab tab={tab} onTabClick={onTabClick} />

          <TagFilterTab tag={tag} />
        </ul>
      </div>

      <ArticleList
        pager={pager}
        articles={articles}
        loading={loading}
        articlesCount={articlesCount}
        currentPage={currentPage}
      />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
