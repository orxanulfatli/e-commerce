import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import AccountBoxOutlinedIcon from "@material-ui/icons/AccountBoxOutlined";
import Badge from "@material-ui/core/Badge";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Loader from "../../Loader/Loader";
import UserOptions from "./UserOptions";
import Topbar from "./Topbar";
import SearchBar from "./SearchBar";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";


const Header = () => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);
    const { cartItems } = useSelector((state) => state.cart);

  if (loading) return <Loader />;
  if (isAuthenticated)
    return (
      <>

      <div className="header">
        <div className="header-logo">
          <Link to={"/"}>
            <img src={logo} />
          </Link>
        </div>
        <SearchBar />
        <nav className="header-nav">
          <ul></ul>
          <ul></ul>
          <ul></ul>
        </nav>
        <UserOptions user={user} />
        </div>
        </>
    );

  return (
    <>
      <Topbar />
      <div className="header">
        <div className="header-logo">
          <Link to="/">
            <img src={logo} />
          </Link>
        </div>
        <SearchBar />
        <nav className="header-nav">
          <ul>
            <li>
              <Link to={"cart"}>
                <Badge badgeContent={cartItems.length} color="error">
                  <AddShoppingCartIcon
                    style={{ color: "black", fontSize: "40px" }}
                  />
                </Badge>
              </Link>
            </li>
            <li>
              {" "}
              <Link to="/login">
                <PermIdentityIcon
                  style={{ color: "black", fontSize: "40px" }}
                />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Header;
