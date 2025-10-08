import { title } from "framer-motion/client";
import { useState, useMemo } from "react";

function SkillsSelector({ items = [], title, onChange }) {
  const [search, setSearch] = useState("");
  const [allItems, setAllItems] = useState(() => [...items]);
  const [checked, setChecked] = useState([]);

  // Filter items based on search
  const filtered = useMemo(() => {
    if (!search.trim()) return allItems;
    return allItems.filter((item) =>
      item.toLowerCase().includes(search.trim().toLowerCase())
    );
  }, [search, allItems]);

  // Handler for checking/unchecking items
  const handleCheck = (item) => {
    setChecked((prev) => {
      const updated = prev.includes(item)
        ? prev.filter((val) => val !== item)
        : [...prev, item];
      if (onChange) onChange(updated);
      return updated;
    });
  };

  // Handler for adding a new item
  const handleAdd = () => {
    if (!search.trim()) return;
    const newItem = search.trim();
    if (!allItems.includes(newItem)) {
      setAllItems((prev) => [newItem, ...prev]);
      setChecked((prev) => {
        const updated = [newItem, ...prev];
        if (onChange) onChange(updated);
        return updated;
      });
      setSearch("");
    }
  };

  return (
    <div className="bg-white rounded-[20px] smallShadow p-4 w-full max-w-md">
      <label className="font-bold mb-3 block H-18">{title}</label>
      <div className="relative mb-4">
        <input
          className="w-full  rounded-[10px] px-4 py-2 bg-white shadow focus:outline-none focus:ring-1 focus:ring-background transition"
          placeholder="Search Your Skills Or Add"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {filtered.length === 0 && search.trim() && (
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white rounded px-3 py-1 shadow-md"
            onClick={handleAdd}
            type="button"
          >
            +
          </button>
        )}
      </div>
      <ul className="flex flex-col gap-3 max-h-[400px] overflow-auto ">
        {filtered.map((item) => (
          <li
            key={item}
            className="flex items-center justify-between px-4 py-3 rounded-[15px] bg-white shadow-md cursor-pointer transition"
            onClick={() => handleCheck(item)}
          >
            <span className="font-medium text-base">{item}</span>
            <span className="relative mt-[3px]">
              <input
                type="checkbox"
                checked={checked.includes(item)}
                onChange={() => handleCheck(item)}
                className="h-5 w-5 appearance-none rounded-full border-1 border-CTA checked:bg-CTA checked:border-CTA transition cursor-pointer"
                onClick={(e) => e.stopPropagation()}
              />
              {checked.includes(item) && (
                <svg
                  className="absolute left-1 top-1 w-3 h-3 text-white pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M4 8l3 3 5-5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SkillsSelector;
