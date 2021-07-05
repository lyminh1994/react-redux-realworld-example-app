import React, { useEffect } from "react";
import { connect } from "react-redux";
import marked from "marked";

import agent from "../../agent";
import {
  ARTICLE_PAGE_LOADED,
  ARTICLE_PAGE_UNLOADED,
} from "../../constants/actionTypes";
import ArticleMeta from "./ArticleMeta";
import CommentContainer from "./CommentContainer";
import { useRouteMatch } from "react-router-dom";

const mapStateToProps = (state) => ({
  ...state.article,
  currentUser: state.common.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  onLoad: (payload) => dispatch({ type: ARTICLE_PAGE_LOADED, payload }),
  onUnload: () => dispatch({ type: ARTICLE_PAGE_UNLOADED }),
});

const Article = ({
  onLoad,
  onUnload,
  article,
  currentUser,
  comments,
  commentErrors,
}) => {
  const { params } = useRouteMatch();

  useEffect(() => {
    onLoad(
      Promise.all([
        agent.Articles.get(params.id),
        agent.Comments.forArticle(params.id),
      ])
    );

    return () => {
      onUnload();
    };
  }, []);

  const markup = {
    __html: marked(article.body, { sanitize: true }),
  };

  const canModify =
    currentUser && currentUser.username === article.author.username;

  if (!article) {
    return null;
  }

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article.title}</h1>
          <ArticleMeta article={article} canModify={canModify} />
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-xs-12">
            <div dangerouslySetInnerHTML={markup}></div>

            <ul className="tag-list">
              {article.tagList.map((tag) => {
                return (
                  <li className="tag-default tag-pill tag-outline" key={tag}>
                    {tag}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <hr />

        <div className="article-actions"></div>

        <div className="row">
          <CommentContainer
            comments={comments || []}
            errors={commentErrors}
            slug={params.id}
            currentUser={currentUser}
          />
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Article);
