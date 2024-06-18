import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../contexts/CityContext";

function CountryList() {
  const { cities, isLoading } = useCities();
  if (isLoading) {
    return <Spinner />;
  }

  const countries = cities.reduce((arr, city) => {
    if (arr.map((ele) => ele.country).includes(city.country)) {
      return arr;
    } else {
      return [...arr, { emoji: city.emoji, country: city.country }];
    }
  }, []);

  if (!countries.length) {
    return (
      <Message message="Add your first country by clicking on a country on the map" />
    );
  }

  return (
    <ul className={styles.countryList}>
      {countries.map((country, id) => (
        <CountryItem key={id} country={country} />
      ))}
    </ul>
  );
}

export default CountryList;
