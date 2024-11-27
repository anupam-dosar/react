import Spinner from "./Spinner";
import Message from "./Message";
import CityItem from "./CityItem";
import PropTypes from "prop-types";

import { useCityState } from "../contexts/CityContext";

import styles from "./CityList.module.css";

CityList.propTypes = {
  cities: PropTypes.array,
  isLoading: PropTypes.bool,
  city: PropTypes.object,
};

function CityList() {
  const { cities, isLoading } = useCityState();

  if (isLoading) return <Spinner />;

  if (!cities.length) return <Message message="Add you first city by clicking on map." />;

  return (
    <ul className={styles.cityList}>
      {cities.map((c) => (
        <CityItem city={c} key={c.id} />
      ))}
    </ul>
  );
}

export default CityList;
