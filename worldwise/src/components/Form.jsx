// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import Spinner from "./Spinner";
import Button from "./Button";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";

import styles from "./Form.module.css";
import "react-datepicker/dist/react-datepicker.css";
import { useCityState } from "../contexts/CityContext";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const APIBASE = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [emoji, setEmoji] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isGeocoding, setIsGeocoding] = useState(false);

  const navigate = useNavigate();

  const { createCity, isLoading } = useCityState();

  const [lat, lng] = useUrlPosition();
  // console.log(lat, lng);

  useEffect(() => {
    async function fetchCityData() {
      setIsGeocoding(true);
      try {
        const res = await fetch(`${APIBASE}?latitude=${lat}&longitude=${lng}`);
        const cityData = await res.json();
        console.log(cityData);

        if (!cityData.countryCode) {
          throw new Error("No city found! Please try to zoom and click on a city.");
        }

        setCityName(cityData.name || cityData.locality || "");
        setCountry(cityData.countryName || "");
        setEmoji(convertToEmoji(cityData.countryCode));
      } catch (err) {
        console.log(err.message);
      } finally {
        setIsGeocoding(false);
      }
    }
    fetchCityData();
  }, [lat, lng]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      cityName: cityName,
      country: country,
      emoji: emoji,
      date: date,
      notes: notes,
      position: {
        lat: lat,
        lng: lng,
      },
    };
    await createCity(newCity);
    navigate("/app/cities");
  }

  return (
    <form className={`${styles.form} ${isLoading ? styles.loading : ""}`} onSubmit={handleSubmit}>
      {isGeocoding && <span>loading..</span>}
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input id="cityName" onChange={(e) => setCityName(e.target.value)} value={cityName} />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd/MM/yyyy"
          id="date"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">
          Notes about your trip to {cityName}, {country}
        </label>
        <textarea id="notes" onChange={(e) => setNotes(e.target.value)} value={notes} />
      </div>

      <div className={styles.buttons}>
        <Button type="primary" key="frmSubmit">
          Add
        </Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
