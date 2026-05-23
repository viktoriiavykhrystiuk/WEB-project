# WEB-project: Укрзалізниця — бронювання квитків

Веб-додаток для пошуку поїздів та бронювання квитків з вибором вагона і місця.

## Стек

- React 19
- React Router 7
- Vite 8
- React Toastify
- CSS Modules

## Структура проекту

```
src/
  components/   — TrainCard, TrainList, WagonSelector, SeatMap, BookingForm
  pages/        — Home, Booking
  context/      — BookingContext (глобальний стан бронювань)
  services/     — BookingService (логіка резервування місць)
  data/         — trains.js (масив поїздів)
```

## Запуск

```bash
npm install
npm run dev
```

Додаток буде доступний за адресою `http://localhost:5173`.

## Функціонал

**Лабораторна 9** — список поїздів з картками, пошук, маршрутизація на сторінку бронювання.

**Лабораторна 10** — вибір вагона, інтерактивна карта місць, форма пасажира, підтвердження бронювання.
