import React, { useState, useEffect } from "react";
import Button from "../Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../services/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "./Navbar.css";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    setButton(window.innerWidth > 960);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    showButton();
    window.addEventListener("resize", showButton);
    return () => {
      window.removeEventListener("resize", showButton);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          TrailExplorer
          <i className="fab fa-typo3" />
        </Link>
        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? "fas fa-times" : "fas fa-bars"} />
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/adventures" className="nav-links" onClick={closeMobileMenu}>
              Adventures
            </Link>
          </li>
          
          {/* Private Section - Only shows when user is logged in */}
          {user && (
            <>
              <li className="nav-item">
                <Link to="/create-trail" className="nav-links" onClick={closeMobileMenu}>
                  New Trail
                </Link>
              </li>
              <li className="nav-item">
                <button className="nav-links" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          )}

          {/* Public Section - Only shows when user is logged out */}
          {!user && (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-links" onClick={closeMobileMenu}>
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-links-mobile" onClick={closeMobileMenu}>
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
        {!user && button && (
          <Button to="/register" buttonStyle="btn--outline">
            REGISTER
          </Button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
