import { createContext, useContext, useEffect, useState } from "react";

const CityContext = createContext();

const APIBASE = "http://localhost:8000/";

function CityProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function fetchCities() {
      setIsLoading(true);
      try {
        const res = await fetch(`${APIBASE}cities`);
        const cities = await res.json();

        setCities(cities);
      } catch (err) {
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();
  }, []);

  async function fetchCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${APIBASE}cities/${id}`);
      const cityData = await res.json();
      setCurrentCity(cityData);
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CityContext.Provider
      value={{
        cities: cities,
        isLoading: isLoading,
        currentCity: currentCity,
        fetchCity: fetchCity,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}

function useCityState() {
  const cityData = useContext(CityContext);
  if (cityData === undefined) throw new Error("CityContext used outside CityProvider boundary!");
  return cityData;
}

export { CityProvider, useCityState };
