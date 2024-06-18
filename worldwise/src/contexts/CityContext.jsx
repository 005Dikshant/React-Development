import { createContext, useState, useEffect, useContext } from "react";

const CitiesContext = createContext();

const BASE_URL = `http://localhost:8000`;

function CityProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  async function getCity(id) {
    setIsLoading(true);
    const res = await fetch(`${BASE_URL}/cities/${id}`);
    const data = await res.json();
    setCurrentCity(data);
    setIsLoading(false);
  }

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(BASE_URL + "/cities");
        const data = await res.json();

        setCities(data);
      } catch (e) {
        console.log(e.message);
        alert(`Error while fetching the data ${e.message}`);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();
  }, []);

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        getCity,
        currentCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  return context;
}

export { CityProvider, useCities };
