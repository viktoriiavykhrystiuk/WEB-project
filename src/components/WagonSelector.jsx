import { useBooking } from "../context/BookingContext";
import styles from "./WagonSelector.module.css";

export default function WagonSelector({ wagons }) {
  const { selectedWagon, setSelectedWagon, setSelectedSeats } = useBooking();

  function handleSelect(wagon) {
    setSelectedWagon(wagon);
    setSelectedSeats([]);
  }

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Оберіть вагон</h3>
      <div className={styles.list}>
        {wagons.map((wagon) => (
          <button
            key={wagon.id}
            className={`${styles.item} ${
              selectedWagon?.id === wagon.id ? styles.active : ""
            }`}
            onClick={() => handleSelect(wagon)}
          >
            <span className={styles.num}>№{wagon.number}</span>
            <span className={styles.type}>{wagon.type}</span>
            <span className={styles.price}>{wagon.price} грн</span>
            <span className={styles.seats}>
              {wagon.seats - wagon.bookedSeats.length} вільних
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
