import { useContext } from "react";
import { Button, Layout } from "antd";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/auth.context";

import Logo from "../assets/tutti-cake-logo.png";

function Navbar() {
  const { Header } = Layout;
  const navigate = useNavigate();
  const { isLoggedIn, logOutUser } = useContext(AuthContext);

  const handleLogout = () => {
    logOutUser();
    navigate("/");
  };

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        background: "#FFF",
        borderBottom: "1px solid rgba(5, 5, 5, 0.06)",
      }}
    >
      <nav className="nav-container">
        <Link to="/" className="logo-container">
          <img src={Logo} alt="TuttiCake Logo" height={48} width={48} />
          TuttiCake
        </Link>

        <ul className="nav-items-container">
          <li>
            <Link to="/cakes">
              <Button type="link">Cakes</Button>
            </Link>
          </li>

          {isLoggedIn ? (
            <>
              <li>
                <Link to={"/order/cart"}>
                  <Button>My Cart</Button>
                </Link>
              </li>
              <li>
                <Link to="/my-account">
                  <Button>My Account</Button>
                </Link>
              </li>

              <li>
                <Button type="primary" onClick={handleLogout}>
                  Logout
                </Button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/sign-up">
                  <Button>Sign Up</Button>
                </Link>
              </li>

              <li>
                <Link to="/login">
                  <Button type="primary">Login</Button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </Header>
  );
}

export default Navbar;
