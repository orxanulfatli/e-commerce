import React, { useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from "../../component/layout/MetaData";
import { clearErrors, getProduct } from "../../Global/actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../component/Loader/Loader";
import { useAlert } from "react-alert";
import Categorybar from "../../component/layout/Sidebar/Categorybar/Categorybar";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="ECOMMERCE" />

          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>
          <h2 className="homeHeading">Featured Products</h2>

            <div style= {{display:'flex',justifyContent:'space-around'}}>
              <Categorybar/>
            <div className="container" id="container">
              {products &&
                products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
