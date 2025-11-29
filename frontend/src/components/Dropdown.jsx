import { useState, useRef, useEffect } from "react";
import "../styles/global.css";

export default function Dropdown({ value, options, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const currentLabel =
    options.find((o) => o.value === value)?.label || "Select…";

  return (
    <div className="dd-wrapper" ref={ref}>
      <button
        type="button"
        className="dd-btn"
        onClick={() => setOpen((prev) => !prev)}
      >
        {currentLabel}
        <span className="dd-arrow">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="dd-menu">
          {options.map((opt) => (
            <div
              key={opt.value}
              className={`dd-item ${
                opt.value === value ? "dd-item-active" : ""
              }`}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
