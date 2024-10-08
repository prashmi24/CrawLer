import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message), setIsAuthorized(true);
    }
  };

  const renderEmployerLinks = () => (
    <>
      <li>
        <Link to={"/job/post"} onClick={() => setShow(false)}>
          For Recruiters
        </Link>
      </li>
      <li>
        <Link to={"/job/me"} onClick={() => setShow(false)}>
          View Your Jobs
        </Link>
      </li>
    </>
  );

  return (
    <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
      <div className="container">
        <div className="logo">
          <img src="/logo.png" alt="logo" />
          <h1>CrawLer</h1>
        </div>
        <ul className={`menu ${show ? "show-menu" : ""}`}>
          <li>
            <Link to={"/"} onClick={() => setShow(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to={"/job/getall"} onClick={() => setShow(false)}>
              Jobs
            </Link>
          </li>
          <li>
            <Link to={"/applications/me"} onClick={() => setShow(false)}>
              {user && user.role === "Employer"
                ? "Applicant's Applications"
                : "My Applications"}
            </Link>
          </li>
          {user && user.role === "Employer" && renderEmployerLinks()}

          <button onClick={handleLogout}>Logout</button>
        </ul>
        <div className="hamburger">
          <GiHamburgerMenu
            aria-label="Toggle Menu"
            onClick={() => setShow(!show)}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
