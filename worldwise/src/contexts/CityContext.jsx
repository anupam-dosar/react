import { createContext, useContext, useEffect, useReducer, useState } from "react";

const CityContext = createContext();

const APIBASE = "http://localhost:8000/";

const initState = {
  cities: [],
  isLoading: false,
  currentCity: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: !state.isLoading };

    case "cities/update":
      return { ...state, cities: action.payload };

    case "cities/current":
      return { ...state, currentCity: action.payload };

    default:
      console.log(action);
      throw new Error("Unknown action!");
  }
}

function CityProvider({ children }) {
  const [{ cities, currentCity, isLoading }, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${APIBASE}cities`);
        const cities = await res.json();

        dispatch({ type: "cities/update", payload: cities });
      } catch (err) {
        console.log(err.message);
      } finally {
        dispatch({ type: "loading" });
      }
    }

    fetchCities();
  }, []);

  async function fetchCity(id) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${APIBASE}cities/${id}`);
      const cityData = await res.json();
      dispatch({ type: "cities/current", payload: cityData });
    } catch (err) {
      console.log(err.message);
    } finally {
      dispatch({ type: "loading" });
    }
  }

  async function createCity(newCity) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${APIBASE}cities/`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "cities/update", payload: [...cities, data] });
    } catch (err) {
      console.log(err.message);
    } finally {
      dispatch({ type: "loading" });
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: "loading" });
      await fetch(`${APIBASE}cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "cities/update", payload: cities.filter((c) => c.id !== id) });
    } catch (err) {
      console.log(err.message);
    } finally {
      dispatch({ type: "loading" });
    }
  }

  return (
    <CityContext.Provider
      value={{
        cities: cities,
        isLoading: isLoading,
        currentCity: currentCity,
        fetchCity: fetchCity,
        createCity: createCity,
        deleteCity: deleteCity,
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
