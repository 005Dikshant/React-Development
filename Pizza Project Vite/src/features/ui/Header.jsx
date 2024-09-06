import { Link } from "react-router-dom";
import SearchOrder from "../order/SearchOrder";

function Header() {
  return (
    <div className="bg-yellow-500">
      <Link to="/">FAST REACT PIZZA CO.</Link>
      <SearchOrder />
      <p>Dikshant</p>
    </div>
  );
}

export default Header;
