import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import BookingService from "../services/BookingService";
import styles from "./BookingForm.module.css";

const EMPTY = { name: "", phone: "", email: "" };
const ERRORS = { name: "", phone: "", email: "" };

function validate(fields) {
  const errors = { ...ERRORS };
  if (!fields.name.trim()) errors.name = "Введіть ваше ім'я";
  else if (fields.name.trim().length < 2) errors.name = "Ім'я занадто коротке";

  if (!fields.phone.trim()) errors.phone = "Введіть номер телефону";
  else if (!/^\+?[\d\s\-()]{7,15}$/.test(fields.phone))
    errors.phone = "Невірний формат телефону";

  if (!fields.email.trim()) errors.email = "Введіть email";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
    errors.email = "Невірний формат email";

  return errors;
}

export default function BookingForm() {
  const { selectedTrain, selectedWagon, selectedSeats, reset } = useBooking();
  const navigate = useNavigate();
  const [fields, setFields] = useState(EMPTY);
  const [errors, setErrors] = useState(ERRORS);
  const [submitting, setSubmitting] = useState(false);

  if (!selectedWagon || selectedSeats.length === 0) return null;

  function handleChange(e) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate(fields);
    if (Object.values(errs).some(Boolean)) {
      setErrors(errs);
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      BookingService.save({
        trainId: selectedTrain.id,
        trainNumber: selectedTrain.number,
        route: `${selectedTrain.from} → ${selectedTrain.to}`,
        wagonId: selectedWagon.id,
        wagonNumber: selectedWagon.number,
        wagonType: selectedWagon.type,
        seats: selectedSeats,
        totalPrice: selectedSeats.length * selectedWagon.price,
        passenger: fields,
      });

      toast.success(
        `Бронювання підтверджено! Місця: ${selectedSeats.sort((a, b) => a - b).join(", ")}`,
        { autoClose: 4000 }
      );
      setSubmitting(false);
      setFields(EMPTY);
      reset();
      navigate("/");
    }, 600);
  }

  const total = selectedSeats.length * selectedWagon.price;

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Форма бронювання</h3>

      <div className={styles.summary}>
        <p>
          <strong>Маршрут:</strong> {selectedTrain.from} → {selectedTrain.to}
        </p>
        <p>
          <strong>Вагон №{selectedWagon.number}</strong> ({selectedWagon.type})
        </p>
        <p>
          <strong>Місця:</strong>{" "}
          {selectedSeats.sort((a, b) => a - b).join(", ")}
        </p>
        <p>
          <strong>До сплати:</strong> {total} грн
        </p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <div className={styles.field}>
          <label className={styles.label}>Ім'я та прізвище</label>
          <input
            className={`${styles.input} ${errors.name ? styles.invalid : ""}`}
            name="name"
            type="text"
            placeholder="Іван Петренко"
            value={fields.name}
            onChange={handleChange}
          />
          {errors.name && <span className={styles.error}>{errors.name}</span>}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Телефон</label>
          <input
            className={`${styles.input} ${errors.phone ? styles.invalid : ""}`}
            name="phone"
            type="tel"
            placeholder="+380 50 000 0000"
            value={fields.phone}
            onChange={handleChange}
          />
          {errors.phone && (
            <span className={styles.error}>{errors.phone}</span>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Email</label>
          <input
            className={`${styles.input} ${errors.email ? styles.invalid : ""}`}
            name="email"
            type="email"
            placeholder="example@email.com"
            value={fields.email}
            onChange={handleChange}
          />
          {errors.email && (
            <span className={styles.error}>{errors.email}</span>
          )}
        </div>

        <button
          type="submit"
          className={styles.submitBtn}
          disabled={submitting}
        >
          {submitting ? "Бронювання..." : "Забронювати квитки"}
        </button>
      </form>
    </div>
  );
}
