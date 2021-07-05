import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import agent from "../agent";
import {
  SETTINGS_SAVED,
  SETTINGS_PAGE_UNLOADED,
  LOGOUT,
} from "../constants/actionTypes";
import ListErrors from "./ListErrors";
import SettingsForm from "./SettingsForm";

const Settings = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.common);
  const { errors } = useSelector((state) => state.settings);

  useEffect(() => {
    return () => {
      dispatch({ type: SETTINGS_PAGE_UNLOADED });
    };
  }, []);

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>

            <ListErrors errors={errors}></ListErrors>

            <SettingsForm
              currentUser={currentUser}
              onSubmitForm={(currentUser) => {
                dispatch({
                  type: SETTINGS_SAVED,
                  payload: agent.Auth.save(currentUser),
                });
              }}
            />

            <hr />

            <button
              className="btn btn-outline-danger"
              onClick={() => {
                dispatch({ type: LOGOUT });
              }}
            >
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
