import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import styles from "./TrainCard.module.css";

function formatTime(iso) {
  return new Date(iso).toLocaleTimeString("uk-UA", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function minPrice(wagons) {
  return Math.min(...wagons.map((w) => w.price));
}

export default function TrainCard({ train }) {
  const navigate = useNavigate();
  const { setSelectedTrain, setSelectedWagon, setSelectedSeats } = useBooking();

  function handleSelect() {
    setSelectedTrain(train);
    setSelectedWagon(null);
    setSelectedSeats([]);
    navigate(`/booking/${train.id}`);
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.number}>#{train.number}</span>
        <span className={styles.date}>{formatDate(train.departure)}</span>
      </div>

      <div className={styles.route}>
        <div className={styles.city}>
          <span className={styles.time}>{formatTime(train.departure)}</span>
          <span className={styles.cityName}>{train.from}</span>
        </div>

        <div className={styles.arrow}>
          <span className={styles.duration}>{train.duration}</span>
          <div className={styles.line}>
            <div className={styles.dot} />
            <div className={styles.dash} />
            <div className={styles.dot} />
          </div>
        </div>

        <div className={styles.city}>
          <span className={styles.time}>{formatTime(train.arrival)}</span>
          <span className={styles.cityName}>{train.to}</span>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.wagons}>
          {train.wagons.map((w) => (
            <span key={w.id} className={styles.wagonBadge}>
              {w.type}
            </span>
          ))}
        </div>
        <div className={styles.priceBlock}>
          <span className={styles.priceLabel}>від</span>
          <span className={styles.price}>{minPrice(train.wagons)} грн</span>
        </div>
        <button className={styles.btn} onClick={handleSelect}>
          Обрати місця
        </button>
      </div>
    </div>
  );
}
