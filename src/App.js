import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";

import agent from "./agent";
import { APP_LOAD } from "./constants/actionTypes";
import Header from "./components/Header";
import Article from "./components/Article";
import Editor from "./components/Editor";
import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import ProfileFavorites from "./components/ProfileFavorites";
import Register from "./components/Register";
import Settings from "./components/Settings";

const App = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { appLoaded, appName, currentUser, redirectTo } = useSelector(
    (state) => state.common
  );

  useEffect(() => {
    if (redirectTo) history.push(redirectTo);
  }, [redirectTo]);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      agent.setToken(token);
    }
    dispatch({
      type: APP_LOAD,
      payload: token ? agent.Auth.current() : null,
      token,
      skipTracking: true,
    });
  }, []);

  if (appLoaded) {
    return (
      <div>
        <Header appName={appName} currentUser={currentUser} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/editor/:slug" component={Editor} />
          <Route path="/editor" component={Editor} />
          <Route path="/article/:id" component={Article} />
          <Route path="/settings" component={Settings} />
          <Route path="/@:username/favorites" component={ProfileFavorites} />
          <Route path="/@:username" component={Profile} />
        </Switch>
      </div>
    );
  }
  return (
    <div>
      <Header appName={appName} currentUser={currentUser} />
    </div>
  );
};

export default App;
