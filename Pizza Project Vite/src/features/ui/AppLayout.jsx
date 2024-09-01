import { Outlet, useNavigation } from "react-router-dom";

import Header from "./Header";
import CartOverview from "../cart/CartOverview";
import Loader from "../ui/Loader";

function AppLayout() {
  const navigation = useNavigation();

  const isLoading = navigation.state === "loading";

  return (
    <div>
      {isLoading && <Loader />}
      <Header />
      <Outlet />
      <CartOverview />
    </div>
  );
}

export default AppLayout;
