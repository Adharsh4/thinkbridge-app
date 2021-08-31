import React, { useEffect, useState } from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
// import { auth } from "./firebase";
import { withRouter } from "react-router-dom";
import logo from "./logo.png"

function Header(props) {

  const [user, setUser] = useState(localStorage.getItem("email"));
  const[search, setSearch] = useState("")

  const signoutHandler = (e) => {
    e.preventDefault()
    localStorage.removeItem("email");
    localStorage.removeItem("productId");
    localStorage.removeItem("category");
    
    props.history.push("/");

  }

  useEffect(() => {
    setUser(localStorage.getItem("email"));
  }, [localStorage.getItem("email")])


  return (
    <div className="header-main">
      <div>
        <Link to="/showProducts">
          <img
            className="header__logo"
            src={logo}
          />
        </Link>
      </div>

      <div className="header__search">
        {/* <input className="header__searchInput" type="text" value={search} name="search"/>
        <SearchIcon className="header__searchIcon" /> */}
      </div>

      <div className="header__nav">
        <Link to={!user && '/login'} className="no-decoration">
          <div className="header__option">
            <span className="header__optionLineOne">Hello {!user ? 'Guest' : user}</span>
            <span className="header__optionLineTwo" onClick={e => { signoutHandler(e) }}>{user ? 'Sign Out' : 'Sign In'}</span>
          </div>
        </Link>

        <Link to='/showProducts' className="no-decoration">
          <div className="header__option">
            <span className="header__optionLineOne">Your</span>
            <span className="header__optionLineTwo">Products</span>
          </div>
        </Link>

      </div>
    </div>
  );
}

export default withRouter(Header);
