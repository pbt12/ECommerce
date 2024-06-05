import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";

import Header from "../Header";
import PrimeDealsSection from "../PrimeDealsSection";
import AllProductsSection from "../AllProductsSection";

import "./index.css";

const Products = () => {
  const accessToken = Cookies.get("jwt_token");
  console.log("This product component has been called");
  if (accessToken === undefined) {
    return <Redirect to="/login" />;
  }
  console.log("refreshed");
  return (
    <>
      <Header />
      <div className="product-sections">
        <PrimeDealsSection />
        <AllProductsSection />
      </div>
    </>
  );
};

export default Products;
