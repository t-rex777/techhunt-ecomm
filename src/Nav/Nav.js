import { useState } from "react";
import {
  AiOutlineLogin,
  AiOutlineShoppingCart,
  AiTwotoneHeart,
  AiFillHome,
} from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, Redirect } from "react-router-dom";
import { useCart } from "../cart-context/CartProvider";
import "./nav.css";



const Nav = () => {
  const { state, dispatch } = useCart();
  const [shouldRedirect, setRedirect] = useState(false);
  const [toggle, setToggle] = useState(false);
  const toggleChange = (e) => {
    setToggle(!toggle);
  };
  const signOut = () => {
    dispatch({ type: "SIGN_OUT" });
    setRedirect(true);
  };
  const navStyle = {
    backgroundColor : toggle ? "#df6d67" : "",
  }
  return (
    <div>
      {shouldRedirect && <Redirect to="/" />}
      <nav className="nav dark text-white" >
        <ul className="nav-items" style={navStyle}>
          <li className="nav-item">
            <Link to="/" className="nav-logo ">
              TechHunt
            </Link>
          </li>
          <Link to="/">
            <li className="nav-item dropdown">
              <AiFillHome />
            </li>
          </Link>
          <Link to="/wishlist">
            <li className="nav-item  ml-3 dropdown">
              <AiTwotoneHeart />
            </li>
          </Link>
          <p className="badge-circle-s danger dropdown">
            {state.wishlist.length}
          </p>
          <Link to="/cart">
            <li className="nav-item  ml-3 dropdown">
              <AiOutlineShoppingCart />
            </li>
          </Link>
          <p className="badge-circle-s danger dropdown">{state.cart.length}</p>

          {state.user._id ? (
            <Link to="" onClick={signOut} style={{ textDecoration: "none" }}>
              <li className="nav-item ml-3 mr-3 dropdown">Sign Out</li>
            </Link>
          ) : (
            <Link to="/signin" style={{ textDecoration: "none" }}>
              <li className="nav-item ml-3 mr-3 dropdown">Sign In</li>
            </Link>
          )}

          <li className="nav-item ml-3 mr-3 hamBurger" onClick={toggleChange}>
            <GiHamburgerMenu />
          </li>
        </ul>
      </nav>

      {toggle && (
        <div className="mobileNav">
          <ul className="stacked-list">
            <Link to="/">
              <li className="stacked-list-item">
                <h3>
                  <AiFillHome /> Home
                </h3>
              </li>
            </Link>

            <Link to="/wishlist">
              <li className="stacked-list-item">
                <h3 className="mobile-icon">
                  <AiTwotoneHeart /> Wishlist
                  <span className="mobile-badge-nav">
                    {state.wishlist.length}
                  </span>
                </h3>
              </li>
            </Link>

            <Link to="/cart">
              <li className="stacked-list-item">
                <h3>
                  <AiOutlineShoppingCart /> Cart
                  <span className="mobile-badge-nav">{state.cart.length}</span>
                </h3>
              </li>
            </Link>
            {state.user._id ? (
              <Link to="" style={{ textDecoration: "none" }}>
                <li className="stacked-list-item" onClick={signOut}>
                  <h3><AiOutlineLogin/> Sign Out</h3>
                </li>
              </Link>
            ) : (
              <Link to="/signin" style={{ textDecoration: "none" }}>
                <li className="stacked-list-item" onClick={signOut}>
                  <h3><AiOutlineLogin/> Sign In</h3>
                </li>
              </Link>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
export default Nav;
