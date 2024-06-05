import { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import Products from "./components/Products";
import ProductItemDetails from "./components/ProductItemDetails";
import Cart from "./components/Cart";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import CartContext from "./context/CartContext";
import RegistrationForm from "./components/RegistrationForm/index";
import "./App.css";

let cartStorage = JSON.parse(localStorage.getItem("userNames"));
if (cartStorage !== null) {
  console.log(cartStorage);
  cartStorage = cartStorage[cartStorage.length - 1];
} else {
  cartStorage = "";
}
let localCart;
localCart = localStorage.getItem(cartStorage);
if (localCart === null) {
  localCart = [];
} else {
  localCart = JSON.parse(localStorage.getItem(cartStorage));
}
console.log("App started again", localCart, cartStorage);
class App extends Component {
  addingCartToStorage = (id) => {
    cartStorage = `cartList_${id}`;
    localCart = localStorage.getItem(cartStorage);
    if (localCart === null) {
      localCart = [];
    } else {
      localCart = JSON.parse(localCart);
    }
    this.setState({ cartList: localCart });
  };
  state = {
    cartList: localCart,
  };

  removeAllCartItems = () => {
    localStorage.setItem(cartStorage, JSON.stringify([]));
    this.setState({ cartList: [] });
    alert("Cart was made Empty");
  };

  incrementCartItemQuantity = (id) => {
    const { cartList } = this.state;
    const updatedCartList = cartList.map((eachCartItem) => {
      if (id === eachCartItem.id) {
        const updatedQuantity = eachCartItem.quantity + 1;
        return { ...eachCartItem, quantity: updatedQuantity };
      }
      return eachCartItem;
    });
    localStorage.setItem(cartStorage, JSON.stringify(updatedCartList));
    this.setState({ cartList: updatedCartList });
  };

  decrementCartItemQuantity = (id) => {
    const { cartList } = this.state;
    const productObject = cartList.find(
      (eachCartItem) => eachCartItem.id === id
    );
    if (productObject.quantity > 1) {
      const updatedCartList = cartList.map((eachCartItem) => {
        if (id === eachCartItem.id) {
          const updatedQuantity = eachCartItem.quantity - 1;
          return { ...eachCartItem, quantity: updatedQuantity };
        }
        return eachCartItem;
      });
      localStorage.setItem(cartStorage, JSON.stringify(updatedCartList));
      this.setState({ cartList: updatedCartList });
      alert("Cart has been updated");
    } else {
      this.removeCartItem(id);
    }
  };

  removeCartItem = (id) => {
    const { cartList } = this.state;
    const updatedCartList = cartList.filter(
      (eachCartItem) => eachCartItem.id !== id
    );
    localStorage.setItem(cartStorage, JSON.stringify(updatedCartList));
    this.setState({ cartList: updatedCartList });
    alert("Removed from Cart");
  };

  addCartItem = (product) => {
    const { cartList } = this.state;
    const productObject = cartList.find(
      (eachCartItem) => eachCartItem.id === product.id
    );

    if (productObject) {
      const updatedCartList = cartList.map((eachCartItem) => {
        if (productObject.id === eachCartItem.id) {
          const updatedQuantity = eachCartItem.quantity + product.quantity;
          return { ...eachCartItem, quantity: updatedQuantity };
        }

        return eachCartItem;
      });
      console.log(updatedCartList);

      localStorage.setItem(cartStorage, JSON.stringify(updatedCartList));
      this.setState({ cartList: updatedCartList });
      alert("Cart has been Updated");
    } else {
      const updatedCartList = [...cartList, product];
      localStorage.setItem(cartStorage, JSON.stringify(updatedCartList));

      this.setState({ cartList: updatedCartList });
      alert("Added To Cart");
    }
  };
  1;
  render() {
    const { cartList } = this.state;
    console.log(cartList, cartStorage);
    console.log("refreshes App");
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route
            path="/login"
            render={(props) => (
              <LoginForm {...props} passingId={this.addingCartToStorage} />
            )}
          />
          <Route exact path="/register/" component={RegistrationForm} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />

          <ProtectedRoute exact path="/" component={Home} />

          <ProtectedRoute exact path="/products" component={Products} />

          <ProtectedRoute exact path="/cart" component={Cart} />

          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    );
  }
}

export default App;
