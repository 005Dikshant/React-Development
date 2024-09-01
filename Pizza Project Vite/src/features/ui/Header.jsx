import { Link } from "react-router-dom";
import SearchOrder from "../order/SearchOrder";

function Header() {
  return (
    <div>
      <Link to="/">FAST REACT PIZZA CO.</Link>
      <SearchOrder />
    </div>
  );
}

export default Header;
