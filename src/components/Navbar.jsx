import { useContext } from "react";
import { Avatar, Badge, Button, Layout, Grid } from "antd";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/auth.context";

import Logo from "../assets/tutti-cake-logo.png";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";

function Navbar() {
  const { Header } = Layout;
  const navigate = useNavigate();
  const { isLoggedIn, logOutUser, cartItemCount, user } = useContext(AuthContext);

  const screens = Grid.useBreakpoint();

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
        padding: screens.lg ? '' : 0,
      }}
    >
      <nav className="nav-container">
        <Link to="/" className="logo-container">
          <img src={Logo} alt="TuttiCake Logo" height={screens.lg ? 48 : 24} width={screens.lg ? 48 : 24} />
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
              <li style={{ marginRight: 12 }}>
                <Link to={"/order/cart"}>
                  <Badge count={cartItemCount} showZero>
                    <Button
                      disabled={cartItemCount < 1}
                      shape="circle"
                      icon={<ShoppingCartOutlined />}
                    />
                  </Badge>
                </Link>
              </li>
              <li>
                {
                  user && (
                    <Link to="/my-account">
                      <Button
                        icon={
                          user.imageUrl ? (
                            <Avatar shape="circle" size='small' src={user.imageUrl} />
                          ) : (
                            <UserOutlined />
                          )
                        }
                        style={{
                          paddingLeft: 4
                        }}
                      >{user.name}</Button>
                    </Link>
                  )
                }
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
