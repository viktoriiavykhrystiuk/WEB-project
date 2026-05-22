import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import trains from "../data/trains";
import { useBooking } from "../context/BookingContext";
import WagonSelector from "../components/WagonSelector";
import SeatMap from "../components/SeatMap";
import BookingForm from "../components/BookingForm";
import styles from "./Booking.module.css";

function formatDateTime(iso) {
  return new Date(iso).toLocaleString("uk-UA", {
    day: "2-digit",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function Booking() {
  const { trainId } = useParams();
  const navigate = useNavigate();
  const { selectedTrain, setSelectedTrain, selectedWagon } = useBooking();

  const train = trains.find((t) => t.id === Number(trainId));

  useEffect(() => {
    if (train && (!selectedTrain || selectedTrain.id !== train.id)) {
      setSelectedTrain(train);
    }
  }, [train, selectedTrain, setSelectedTrain]);

  if (!train) {
    return (
      <div className={styles.notFound}>
        <p>Рейс не знайдено.</p>
        <button onClick={() => navigate("/")} className={styles.backBtn}>
          На головну
        </button>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <button onClick={() => navigate("/")} className={styles.backBtn}>
          ← Назад
        </button>
        <div className={styles.routeInfo}>
          <strong>
            {train.from} → {train.to}
          </strong>
          <span>
            Потяг #{train.number} · {formatDateTime(train.departure)}
          </span>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.left}>
          <WagonSelector wagons={train.wagons} />

          {selectedWagon && (
            <SeatMap wagon={selectedWagon} trainId={train.id} />
          )}
        </div>

        <div className={styles.right}>
          <BookingForm />
        </div>
      </div>
    </div>
  );
}
