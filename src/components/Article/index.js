import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";

import agent from "../../agent";
import {
  ARTICLE_PAGE_LOADED,
  ARTICLE_PAGE_UNLOADED,
} from "../../constants/actionTypes";
import ArticleMeta from "./ArticleMeta";
import CommentContainer from "./CommentContainer";

const Article = () => {
  const dispatch = useDispatch();
  const { article, comments, commentErrors } = useSelector(
    (state) => state.article
  );
  const currentUser = useSelector((state) => state.common.currentUser);
  const { params } = useRouteMatch();

  useEffect(() => {
    dispatch({
      type: ARTICLE_PAGE_LOADED,
      payload: Promise.all([
        agent.Articles.get(params.id),
        agent.Comments.forArticle(params.id),
      ]),
    });

    return () => {
      dispatch({ type: ARTICLE_PAGE_UNLOADED });
    };
  }, []);

  const canModify =
    currentUser && currentUser.username === "article.author.username";

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
            <div>{article.body}</div>

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

export default Article;
