import styles from "./Filters.module.scss";

// Массив фильтров вынесен наружу, чтобы не создавать его заново при каждом рендере
const FILTERS = ["all", "active", "completed"] as const;

// Словарь для отображаемых названий кнопок
const FILTER_LABELS: Record<typeof FILTERS[number], string> = {
  all: "All",
  active: "Active",
  completed: "Completed",
};

interface FiltersProps {
  current: typeof FILTERS[number];
  onChange: (filter: typeof FILTERS[number]) => void;
}

export default function Filters({ current, onChange }: FiltersProps) {
  return (
    <div className={styles.filters}>
      {FILTERS.map((filter) => (
        <button
          key={filter}
          className={`${styles.button} ${current === filter ? styles.active : ""}`}
          onClick={() => onChange(filter)}
        >
          {FILTER_LABELS[filter]}
        </button>
      ))}
    </div>
  );
}
