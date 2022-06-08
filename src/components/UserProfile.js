import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../redux/actions/userprofileAction";
import profileImage from "../public/images/react.jpeg";

const UserProfile = () => {
  const useLogdin = localStorage.getItem("userLogin");
  const dispatch = useDispatch();
  const profileData = useSelector((state) => state.userprofile.userprofile);

  useEffect(() => {
    if (useLogdin) {
      dispatch(getUserProfile());
    }
  }, []);

  return (
    <div className="profile">
      <h1 style={{ textAlign: "center", marginTop: "1%" }}>
        <div className="text-center">
          <img
            className="profile-user-img img-fluid img-circle"
            src={profileImage}
          />
          <h3 className="profile-username text-center">
            {profileData.firstname} {profileData.lastname}
          </h3>
          <p class="text-muted text-center">{profileData.designation}</p>
        </div>
        <hr />
        <div className="text-center">
          <strong>Education</strong>

          <p className="text-muted" style={{ marginLeft: "20%" }}>
            {profileData.education}
          </p>
        </div>
        <hr />
        <strong>
          <i className="fas fa-map-marker-alt mr-1"></i> Location
        </strong>

        <p className="text-muted">{profileData.location}</p>
        <hr />

        <strong>
          <i className="far fa-file-alt mr-1"></i> Skills
        </strong>

        <p className="text-muted">
          <span class="tag tag-danger">{profileData.skills}</span>
        </p>
      </h1>
    </div>
  );
};

export default UserProfile;
