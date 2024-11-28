import { useState } from "react";
import Star from "./Star";
import PropTypes from "prop-types";

const styles = {
  wrapper: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  star: {
    display: "flex",
  },
};

export default function Rating({
  max = 5,
  color = "#fcc419",
  size = 48,
  customMessages = [],
  defaultRating = 0,
  onSetRating = () => null,
}) {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);
  const textStyle = {
    lineHeight: "1",
    margin: "0",
    fontSize: `${size / 1.5}px`,
    color: color,
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.star}>
        {Array.from({ length: max }, (_, i) => (
          <Star
            key={i}
            color={color}
            size={size}
            fill={tempRating ? tempRating > i : rating > i}
            onClick={() => {
              setRating(i + 1);
              onSetRating(i + 1);
            }}
            onMouseEnter={() => setTempRating(i + 1)}
            onMouseLeave={() => setTempRating(0)}
          />
        ))}
      </div>
      <p style={textStyle}>
        {customMessages.length
          ? customMessages[(tempRating || rating || 0) - 1]
          : tempRating || rating || ""}
      </p>
    </div>
  );
}
