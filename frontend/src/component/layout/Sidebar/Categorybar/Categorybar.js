import './Categorybar.css'

import ComputerIcon from "@material-ui/icons/Computer";
import SmartphoneIcon from "@material-ui/icons/Smartphone";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import { useHistorySearch } from '../../../../hooks/useHistorySearch';

const categoriesWithIcons = [
  {
    icons: <SmartphoneIcon />,
    name: "Phones",
  },
  {
    icons: <ComputerIcon  />,
    name: "Computers",
  },
  {
    icons: <LocalMallIcon  />,
    name: "Bags",
  },
  {
    icons: <PhotoCameraIcon />,
    name: "Cameras",
  },
];

const Categorybar = () => {
  const history = useHistorySearch();
  const categoryHandler = (category) => {
    let params = { category };
    history("/category", params);
  };
  return (
    <div className="categoryBox">
      <h3>Categories</h3>
      <ul className="">
        {categoriesWithIcons.map((category) => (
          <li
            name="category"
            className="category-link"
            key={category.name}
            onClick={() => {
              categoryHandler(category.name);
            }}
          >
            {category.icons} <span>{category.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categorybar;
