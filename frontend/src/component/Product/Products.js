import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../Global/actions/productAction";
import Loader from "../Loader/Loader";
import ProductCard from "../../Pages/Home/ProductCard";
import Pagination from "react-js-pagination";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { useLocation, useParams } from "react-router-dom";
import { useSearchParams } from "../../hooks/useSearchParams";

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const Products = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [currentPage, setCurrentPage] = useState(1);
  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);
  const { search } = useLocation();
  let query = useSearchParams();


  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const queryParams = {
    price: [
      query.get("price[gte]") ? parseInt(query.get("price[gte]")) : 0,
      query.get("price[lte]") ? parseInt(query.get("price[lte]")) : 25000,
    ],
    category: query.get("category") ? query.get("category") : "",
    ratings: query.get("ratings") ? parseInt(query.get("ratings")) : 0,
    currentPage: query.get("currentPage") ? query.get("currentPage") : 1,
    keyword: query.get("keyword") ? query.get("keyword") : "",
  };

  console.log(queryParams.category);

  let count = filteredProductsCount;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(
      getProduct(
        queryParams.keyword,
        queryParams.currentPage,
        queryParams.price,
        queryParams.category,
        queryParams.ratings
      )
    );
    return () => {
      console.log("unmount eba");
    };
  }, [dispatch, search, alert, error, currentPage]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="PRODUCTS -- ECOMMERCE" />
          <h2 className="productsHeading">Products</h2>
          {/* <Filterbar/> */}

          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
