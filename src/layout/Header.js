import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import tempImage from "../public/productsimages/product.png";
import { removeProductFromCart } from "../redux/actions/productActions";
import { toast } from "react-toastify";
import { Link, NavLink, useNavigate } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as FiIcons from "react-icons/fi";
import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";
import SideBar from "./SideBar";
import "./Navbar.css";
import { logOutUser } from "../redux/actions/loginActions";

const Header = () => {
  const userName = localStorage.getItem("userEmail");
  const [sidebar, serSideBar] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");
  const profileData = useSelector((state) => state.userprofile.userprofile);
  const node = useRef();

  const showsideBar = (e) => {
    serSideBar(true);
  };

  const hideSideBar = () => {
    serSideBar(false);
  };

  const counts = localStorage.getItem("cartValue");
  const countCart = useSelector((state) => state.products.countCart);
  const storeData = useSelector((state) => state.products.cartData);
  const [localstoreData, setlocalstoreData] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const counts = localStorage.getItem("cartValue");
    const localstoreData = JSON.parse(localStorage.getItem("cartDatas"));
    if (localstoreData) {
      setlocalstoreData(localstoreData);
    }

    const handleCart = (e) => {
      if (node.current.contains(e.target)) {
        setShowDropdown(true);
      } else {
        setShowDropdown(false);
      }
    };

    document.body.addEventListener("click", handleCart);
    return () => document.body.removeEventListener("click", handleCart);
  }, [counts]);

  const removeFromCart = (data) => {
    dispatch(removeProductFromCart(data));
    toast.success("Remove product successfully");
  };

  return (
    <>
      <div className="mainNavbar">
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showsideBar} />
          </Link>
          <div>
            <p className="shoppingBag" ref={node}>
              <i className="fa badge fa-lg" value={counts ? counts : 0}>
                &#xf07a;
                <RiIcons.RiShoppingBagLine
                  style={{
                    height: "15%",
                    width: "31px",
                    marginTop: "25%",
                    cursor: "pointer",
                  }}
                />
              </i>

              {/* <button data-badge="10" aria-label="10 unread notifications">
                <RiIcons.RiShoppingBagLine />
              </button> */}
              {/* <RiIcons.RiShoppingBagFill /> */}
            </p>
          </div>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items">
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose
                  onClick={hideSideBar}
                  style={{ marginLeft: "20%" }}
                />
              </Link>
            </li>
            <SideBar />
          </ul>
        </nav>
      </div>

      {showDropdown ? (
        <div className="dropDown">
          <ul className="dd-list">
            {localstoreData.length > 0
              ? localstoreData.map((data, index) => (
                  <li key={index}>
                    <img
                      className="profile-user-img img-fluid img-circle"
                      src={tempImage}
                      style={{ width: "15%" }}
                    />{" "}
                    {data.quanitity > 0 ? data.pname : ""}
                    <span className="float-right text-muted text-sm">
                      {data.quanitity} Qty
                      <button
                        className="btn btn=sm"
                        onClick={() => removeFromCart(index)}
                      >
                        <AiIcons.AiOutlineMinusCircle
                          data-toggle="tooltip"
                          title="Remove from cart"
                          style={{
                            cursor: "pointer",
                            width: "150px",
                            height: "20",
                          }}
                        />
                      </button>
                    </span>
                  </li>
                ))
              : ""}
          </ul>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Header;
