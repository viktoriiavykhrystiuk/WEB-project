const STORAGE_KEY = "uz_bookings";

const BookingService = {
  getAll() {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  },

  save(booking) {
    const bookings = this.getAll();
    const newBooking = {
      ...booking,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };
    bookings.push(newBooking);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
    return newBooking;
  },

  getBookedSeatsForWagon(trainId, wagonId) {
    const bookings = this.getAll();
    const seats = [];
    bookings.forEach((b) => {
      if (b.trainId === trainId && b.wagonId === wagonId) {
        seats.push(...b.seats);
      }
    });
    return seats;
  },
};

export default BookingService;
