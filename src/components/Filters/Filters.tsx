import styles from "./Filters.module.scss";

const FILTERS = ["all", "active", "completed"] as const;

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
