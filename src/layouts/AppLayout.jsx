import { Outlet } from "react-router-dom";

import AppHeader from "../components/AppHeader";
import AppNevbar from "../components/AppNevbar";
import AppFooter from "../components/AppFooter";

const AppLayout = ({products, carts, setToken}) => {
  return (
    <>
      <AppHeader />
      <AppNevbar products={products} carts={carts} setToken={setToken}/>
      <Outlet />
      <AppFooter />
    </>
  );
};

export default AppLayout;
