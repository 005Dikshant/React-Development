import { useFetcher, useLoaderData } from "react-router-dom";
import { getMenu } from "../services/apiRestaurant";

import MenuItem from "./MenuItem";
import { useEffect } from "react";

function Menu() {
  const menu = useLoaderData();

  const fetcher = useFetcher();

  useEffect(() => {
    fetcher.load("/menu");
  }, [fetcher]);

  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

export async function loader() {
  const menu = await getMenu();

  return menu;
}

export default Menu;
