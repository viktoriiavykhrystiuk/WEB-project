import { createContext, useContext, useState } from "react";

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [selectedWagon, setSelectedWagon] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  function toggleSeat(seatNumber) {
    setSelectedSeats((prev) =>
      prev.includes(seatNumber)
        ? prev.filter((s) => s !== seatNumber)
        : [...prev, seatNumber]
    );
  }

  function reset() {
    setSelectedTrain(null);
    setSelectedWagon(null);
    setSelectedSeats([]);
  }

  return (
    <BookingContext.Provider
      value={{
        selectedTrain,
        setSelectedTrain,
        selectedWagon,
        setSelectedWagon,
        selectedSeats,
        setSelectedSeats,
        toggleSeat,
        reset,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  return useContext(BookingContext);
}
