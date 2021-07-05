import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";

import agent from "../agent";
import {
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED,
} from "../constants/actionTypes";
import ArticleList from "./ArticleList";
import EditProfileSettings from "./EditProfileSettings";
import FollowUserButton from "./FollowUserButton";

const ProfileFavorites = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.common);
  const profile = useSelector((state) => state.profile);
  const { pager, articles, articlesCount, currentPage } = useSelector(
    (state) => state.articleList
  );
  const { params } = useRouteMatch();
  const isUser = currentUser && profile.username === currentUser.username;

  useEffect(() => {
    dispatch({
      type: PROFILE_PAGE_LOADED,
      pager: agent.Articles.favoritedBy(params.username, pager),
      payload: Promise.all([
        agent.Profile.get(params.username),
        agent.Articles.favoritedBy(params.username),
      ]),
    });

    return () => {
      dispatch({ type: PROFILE_PAGE_UNLOADED });
    };
  }, []);

  const renderTabs = () => {
    return (
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <Link className="nav-link" to={`/@${profile.username}`}>
            My Articles
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link active"
            to={`/@${profile.username}/favorites`}
          >
            Favorited Articles
          </Link>
        </li>
      </ul>
    );
  };

  if (!profile) {
    return null;
  }

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img
                src={profile.image}
                className="user-img"
                alt={profile.username}
              />
              <h4>{profile.username}</h4>
              <p>{profile.bio}</p>

              <EditProfileSettings isUser={isUser} />
              <FollowUserButton isUser={isUser} user={profile} />
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">{renderTabs()}</div>

            <ArticleList
              pager={pager}
              articles={articles}
              articlesCount={articlesCount}
              state={currentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileFavorites;
