import './Filterbar.css'
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useHistorySearch } from "../../../../hooks/useHistorySearch";
import { useSearchParams } from "../../../../hooks/useSearchParams";


const Filterbar = () => {
  const history = useHistorySearch();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const keyword = searchParams.get("keyword");

const initState = {
  price: [0, 25000],
  ratings: 0,
  currentPage: 1,
};
  const [values, setValues] = useState(initState);
  const [isFiltering, setIsFiltering] = useState(false);

  //e.target.getAttribute('name') or e.target.name dont work on material UI SLider
  //this is why i create funtion with name argument
  const filterHandler = (name) => (event, sliderValue) => {
    setIsFiltering(true);
    switch (name) {
      case "price":
        setValues((prev) => ({ ...prev, price: sliderValue }));
        console.log("slider");
        break;
      case "ratings":
        setValues((prev) => ({ ...prev, ratings: sliderValue }));
        break;
      default:
        break;
    }
  };
  console.log(values);

  useEffect(() => {
    if (isFiltering) {
        
      let params;
      let param2;
      if (category) {
        param2 = {
          category,
          "price[gte]": values.price[0],
          "price[lte]": values.price[1],
          ratings: values.ratings,
        };
        params = `category=${category}&price[gte]=${values.price[0]}&price[lte]=${values.price[1]}&ratings=${values.ratings}`;
        history("/category", param2);
      }
      if (keyword) {
        params = `keyword=${keyword}&price[gte]=${values.price[0]}&price[lte]=${values.price[1]}&ratings=${values.ratings}`;
        history("/search", params);
      }
    }
    return () => {
      setIsFiltering(false);
    };
  }, [values]);
  return (
    <div className="filterBox">
      <fieldset>
        <Typography component="legend">Price</Typography>
        <Slider
          name="price"
          value={values.price}
          onChange={filterHandler("price")}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          min={0}
          max={25000}
        />
      </fieldset>

      <fieldset>
        <Typography component="legend">Ratings Above</Typography>
        <Slider
          name="ratings"
          value={values.ratings}
          onChange={filterHandler("ratings")}
          aria-labelledby="continuous-slider"
          valueLabelDisplay="auto"
          min={0}
          max={5}
        />
      </fieldset>
    </div>
  );
};

export default Filterbar;
