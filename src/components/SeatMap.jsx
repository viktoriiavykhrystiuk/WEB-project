import { useBooking } from "../context/BookingContext";
import BookingService from "../services/BookingService";
import styles from "./SeatMap.module.css";

export default function SeatMap({ wagon, trainId }) {
  const { selectedSeats, toggleSeat, selectedTrain } = useBooking();

  const savedBooked = BookingService.getBookedSeatsForWagon(
    trainId,
    wagon.id
  );
  const allBooked = [...new Set([...wagon.bookedSeats, ...savedBooked])];

  function seatStatus(num) {
    if (allBooked.includes(num)) return "booked";
    if (selectedSeats.includes(num)) return "selected";
    return "free";
  }

  const seats = Array.from({ length: wagon.seats }, (_, i) => i + 1);

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>
        Схема вагону №{wagon.number} — {wagon.type}
      </h3>

      <div className={styles.legend}>
        <span className={styles.legendItem}>
          <span className={`${styles.dot} ${styles.free}`} /> Вільне
        </span>
        <span className={styles.legendItem}>
          <span className={`${styles.dot} ${styles.selected}`} /> Обране
        </span>
        <span className={styles.legendItem}>
          <span className={`${styles.dot} ${styles.booked}`} /> Заброньоване
        </span>
      </div>

      <div className={styles.grid}>
        {seats.map((num) => {
          const status = seatStatus(num);
          return (
            <button
              key={num}
              className={`${styles.seat} ${styles[status]}`}
              disabled={status === "booked"}
              onClick={() => status !== "booked" && toggleSeat(num)}
              title={`Місце ${num}`}
            >
              {num}
            </button>
          );
        })}
      </div>

      {selectedSeats.length > 0 && (
        <p className={styles.info}>
          Обрано місць: <strong>{selectedSeats.length}</strong> —{" "}
          {selectedSeats.sort((a, b) => a - b).join(", ")} | Сума:{" "}
          <strong>{selectedSeats.length * wagon.price} грн</strong>
        </p>
      )}
    </div>
  );
}
