import React, { Fragment, useState, useEffect } from "react";

import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";

// import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";

import {
  updateProfile,
  loadUser,
  clearErrors,
} from "../../actions/userActions";

const UpdateProfile = () => {
  //states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");

  const dispatch = useDispatch();
  // const alert = useAlert();
  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const options = {
    pathname: "/me",
  };

  const { user } = useSelector((state) => state.auth);
  const { error, isUpdated, loading } = useSelector((state) => state.user);

  const oldImage = user.avatar.url;
  const [avatarPreview, setAvatarPreview] = useState(oldImage);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatar(user.avatar.url);
    }

    if (error) {
      // alert.error("Something went wrong");
      dispatch(clearErrors());
    }

    if (isUpdated) {
      // alert.success("user updated successfully");

      dispatch(loadUser());

      navigate(options, { replace: true });

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, navigate, error, isUpdated, user, options]);

  //submit handler
  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.set("name", name);
    formData.set("email", email);
    formData.set("avatar", avatar);

    dispatch(updateProfile(formData));
  };

  //onChange handler for the avatar
  const onChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <Fragment>
      <MetaData title="Update My Profile" />
      {loading ? (
        <Loader />
      ) : (
        <div className="row wrapper">
          <div className="col-10 col-lg-5">
            <form
              className="shadow-lg"
              onSubmit={submitHandler}
              encType="multipart/form-data"
            >
              <h1 className="mt-2 mb-5">Update Profile</h1>

              <div className="form-group">
                <label htmlFor="email_field">Name</label>
                <input
                  type="name"
                  id="name_field"
                  className="form-control"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email_field">Email</label>
                <input
                  type="email"
                  id="email_field"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="avatar_upload">Avatar</label>
                <div className="d-flex align-items-center">
                  <div>
                    <figure className="avatar mr-3 item-rtl">
                      <img
                        src={avatarPreview}
                        className="rounded-circle"
                        alt="Avatar Preview"
                      />
                    </figure>
                  </div>
                  <div className="custom-file">
                    <input
                      type="file"
                      name="avatar"
                      className="custom-file-input"
                      id="customFile"
                      accept="images/*"
                      onChange={onChange}
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      Choose Avatar
                    </label>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="btn update-btn btn-block mt-4 mb-3"
                disabled={loading ? true : false}
              >
                Update
              </button>
            </form>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default UpdateProfile;
