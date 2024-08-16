import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { ShopContext } from "../../context/ShopContext";
import Vector1 from "../../assets/Vector1.png";
import Vector2 from "../../assets/Vector2.png";
import Vector3 from "../../assets/Vector3.png";
import Vector4 from "../../assets/Vector4.png";
import "./navbar.scss";

const MenuIcon = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
    cursor: pointer;
    font-size: 1.5rem;
  }
`;

const CartIconContainer = styled.div`
  position: relative;
`;

const CartCounter = styled.div`
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: red;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
`;

const Navbar: React.FC = () => {
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const context = useContext(ShopContext);


  if (!context) {
    throw new Error("Navbar must be used within a ShopContextProvider");
  }

  const { cartItems } = context;

  const handleSearchIconClick = () => {
    setIsSearchClicked(!isSearchClicked);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const cartQuantity = Object.values(cartItems).reduce(
    (acc, quantity) => acc + quantity,
    0
  );

  

  return (
    <>
      <div id="navigation-bar" className={isMenuOpen ? "menu-open" : ""}>
        <header>
          <nav className="navbar-container">
            <div className="navFlex">
              <MenuIcon onClick={toggleMenu}>
                {isMenuOpen ? (
                  <div className="menuIcon">&#x2715;</div>
                ) : (
                  <div className="menuIcon">&#9776;</div>
                )}
              </MenuIcon>
              <ul className="navlinks">
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/shop" id="shop">
                    Shop
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/about" id="about">
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/contact" id="contact">
                    Contact
                  </NavLink>
                </li>
              </ul>
              <div className="icons">
                <NavLink to="/" id="logo1">
                  <div className="icon">
                    <img src={Vector1} alt="Logo" className="iconImgs" />
                  </div>
                </NavLink>
                <div
                  id="logo2"
                  className="icon"
                  onClick={handleSearchIconClick}
                >
                  <img src={Vector2} alt="Search" className="iconImgs" />
                </div>
                {/* {isSearchClicked && <Search onSearch={handleSearch} />} */}
                <NavLink to="/" id="logo3">
                  <div className="icon">
                    <img src={Vector3} alt="Logo" className="iconImgs" />
                  </div>
                </NavLink>
                <CartIconContainer>
                  <Link to="/cart" id="logo4">
                    <div className="icon">
                      <img src={Vector4} alt="Cart-icon" className="iconImgs" />
                    </div>
                  </Link>
                  {cartQuantity > 0 && (
                    <CartCounter>{cartQuantity}</CartCounter>
                  )}
                </CartIconContainer>
              </div>
            </div>
          </nav>
        </header>
      </div>
    </>
  );
};

export default Navbar;
