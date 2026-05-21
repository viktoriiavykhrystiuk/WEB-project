import { useState } from "react";
import TrainCard from "./TrainCard";
import styles from "./TrainList.module.css";

export default function TrainList({ trains }) {
  const [query, setQuery] = useState("");

  const filtered = trains.filter((t) => {
    const q = query.toLowerCase();
    return (
      t.number.toLowerCase().includes(q) ||
      t.from.toLowerCase().includes(q) ||
      t.to.toLowerCase().includes(q)
    );
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Пошук за номером потяга або містом..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.input}
        />
      </div>

      {filtered.length === 0 ? (
        <p className={styles.empty}>Рейсів не знайдено.</p>
      ) : (
        <div className={styles.list}>
          {filtered.map((train) => (
            <TrainCard key={train.id} train={train} />
          ))}
        </div>
      )}
    </div>
  );
}
