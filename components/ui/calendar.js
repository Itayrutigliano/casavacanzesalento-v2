
export const Calendar = ({ selected, onSelect, className }) => (
  <input
    type="date"
    className={className}
    onChange={(e) => {
      const d = new Date(e.target.value);
      onSelect({ from: d, to: d });
    }}
  />
);
