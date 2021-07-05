import React, { useEffect, useState } from "react";

const SettingsForm = ({ currentUser, onSubmitForm }) => {
  const [user, setUser] = useState({
    image: "",
    username: "",
    bio: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (currentUser) {
      setUser({
        ...user,
        image: currentUser.image || "",
        username: currentUser.username,
        bio: currentUser.bio,
        email: currentUser.email,
      });
    }
  }, []);

  const updateUser = (field) => (ev) => {
    const newUser = { ...user, [field]: ev.target.value };
    setUser(newUser);
  };

  const submitForm = (ev) => {
    ev.preventDefault();

    if (!user.password) {
      delete user.password;
    }

    onSubmitForm(user);
  };

  return (
    <form onSubmit={submitForm}>
      <fieldset>
        <fieldset className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="URL of profile picture"
            value={user.image ?? ""}
            onChange={updateUser("image")}
          />
        </fieldset>

        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="text"
            placeholder="Username"
            value={user.username ?? ""}
            onChange={updateUser("username")}
          />
        </fieldset>

        <fieldset className="form-group">
          <textarea
            className="form-control form-control-lg"
            rows="8"
            placeholder="Short bio about you"
            value={user.bio ?? ""}
            onChange={updateUser("bio")}
          ></textarea>
        </fieldset>

        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="email"
            placeholder="Email"
            value={user.email ?? ""}
            onChange={updateUser("email")}
          />
        </fieldset>

        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="password"
            placeholder="New Password"
            value={user.password ?? ""}
            onChange={updateUser("password")}
          />
        </fieldset>

        <button
          className="btn btn-lg btn-primary pull-xs-right"
          type="submit"
          disabled={user.inProgress}
        >
          Update Settings
        </button>
      </fieldset>
    </form>
  );
};

export default SettingsForm;
