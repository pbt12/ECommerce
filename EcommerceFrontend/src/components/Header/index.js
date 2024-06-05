import { Link, withRouter } from "react-router-dom";
import Cookies from "js-cookie";

import CartContext from "../../context/CartContext";
import { Component } from "react";
import "./index.css";

class Header extends Component {
  onClickLogout = () => {
    const { history } = this.props;
    let value = JSON.parse(localStorage.getItem("userNames"));

    if (value === [] || value === null) {
    } else {
      value.pop();
      localStorage.setItem("userNames", JSON.stringify(value));
    }
    Cookies.remove("jwt_token");
    history.replace("/login");
    alert("Logged Out Successfully");
  };

  renderCartItemsCount = () => (
    <CartContext.Consumer>
      {(value) => {
        const { cartList } = value;
        const cartItemsCount = cartList.length;

        return (
          <>
            {cartItemsCount > 0 ? (
              <span className="cart-count-badge">{cartList.length}</span>
            ) : null}
          </>
        );
      }}
    </CartContext.Consumer>
  );

  render() {
    return (
      <nav className="nav-header">
        <div className="nav-content">
          <div className="nav-bar-mobile-logo-container">
            <Link to="/">
              <img
                className="website-logo"
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
                alt="website logo"
              />
            </Link>

            <button
              type="button"
              className="nav-mobile-btn"
              onClick={this.onClickLogout}
            >
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
                alt="nav logout"
                className="nav-bar-img"
              />
            </button>
          </div>

          <div className="nav-bar-large-container">
            <Link to="/">
              <img
                className="website-logo"
                src="https://res.cloudinary.com/srinu879033/image/upload/c_lfill,h_39,w_165/v1636038018/FashionFit_bxjugo.jpg"
                alt="website logo"
              />
            </Link>
            <ul className="nav-menu">
              <li className="nav-menu-item" id="0">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>

              <li className="nav-menu-item" id="1">
                <Link to="/products" className="nav-link" id="1">
                  Products
                </Link>
              </li>

              <li className="nav-menu-item" id="2">
                <Link to="/cart" className="nav-link" id="2">
                  Cart
                  {this.renderCartItemsCount()}
                </Link>
              </li>
            </ul>
            <button
              type="button"
              className="logout-desktop-btn"
              onClick={this.onClickLogout}
            >
              Logout
            </button>
          </div>
        </div>
        <div className="nav-menu-mobile">
          <ul className="nav-menu-list-mobile">
            <li className="nav-menu-item-mobile">
              <Link to="/" className="nav-link">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-icon.png"
                  alt="nav home"
                  className="nav-bar-img"
                  id="0"
                />
              </Link>
            </li>

            <li className="nav-menu-item-mobile">
              <Link to="/products" className="nav-link">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-products-icon.png"
                  alt="nav products"
                  className="nav-bar-img"
                  id="1"
                />
              </Link>
            </li>
            <li className="nav-menu-item-mobile">
              <Link to="/cart" className="nav-link">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-icon.png"
                  alt="nav cart"
                  className="nav-bar-img"
                  id="2"
                />
                {this.renderCartItemsCount()}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default withRouter(Header);
