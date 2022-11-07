import { useLocation, useRouteMatch } from "react-router-dom";
import Categorybar from "./Categorybar/Categorybar";
import Filterbar from "./Filterbar/FIlterbar";

const Sidebar = () => {
  const { pathname } = useLocation();
  const match = useRouteMatch("search" | "category");

  console.log(pathname);
  let content;
//   if (pathname === "/") content = <Categorybar />;
  if ((pathname === "/category") | (pathname === "/search"))
    content = <Filterbar />;

  return <>{content}</>;
};

export default Sidebar;
