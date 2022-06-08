import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logOutUser } from "../redux/actions/loginActions";
import { useDispatch, useSelector } from "react-redux";
import * as AiIcons from "react-icons/ai";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import * as FiIcons from "react-icons/fi";
import * as TbIcons from "react-icons/tb";

const SideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");
  const profileData = useSelector((state) => state.userprofile.userprofile);

  const handleLogout = () => {
    localStorage.removeItem("userLogin");
    localStorage.removeItem("userEmail");

    dispatch(logOutUser());

    setTimeout(() => {
      navigate("/");
      navigate(0);
    }, 10);
  };

  const hideDropdown = () => {
    setShowDropdown(false);
  };

  return (
    <>
      <li className="nav-text">
        <NavLink to="/dashboard">
          <AiIcons.AiOutlineHome />
          <span>Dashboard</span>
        </NavLink>
      </li>

      <li className="nav-text">
        <NavLink to="/contactus">
          <MdIcons.MdPermContactCalendar />
          <span>Contact Us</span>
        </NavLink>
      </li>

      <li className="nav-text">
        <NavLink to="/profile">
          <FaIcons.FaUserAlt />
          <span>Profile</span>
        </NavLink>
      </li>

      <li className="nav-text">
        <NavLink to="/pagination-employee">
          <MdIcons.MdOutlineFindInPage />
          <span>Pagination Employee</span>
        </NavLink>
      </li>

      <li className="nav-text">
        <NavLink to="/products">
          <TbIcons.TbPaperBag />
          <span>Products</span>
        </NavLink>
      </li>

      <li className="nav-text">
        <a style={{ cursor: "pointer" }}>
          <FiIcons.FiLogOut />
          <span onClick={handleLogout}>Logout</span>
        </a>
      </li>
    </>
  );
};

export default SideBar;
