import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function CustomDatePicker({
  selectedDate,
  onChange,
}: {
  selectedDate: Date;
  onChange: (date: Date) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false); // Close date picker if click is outside
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const toggleCalendar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative w-[200px] mb-8" ref={wrapperRef}>
      <button
        type="button"
        onClick={toggleCalendar}
        className="w-full h-[38px] rounded-[10px] shadow-md flex items-center justify-between px-4 text-black text-lg font-medium font-Montserrat bg-white text-black text-opacity-60"
      >
        {selectedDate.toLocaleDateString()}
        <span>📅</span>
      </button>
      {isOpen && (
        <div className="absolute top-11 z-40">
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date) => {
              onChange(date);
              setIsOpen(false);
            }}
            inline
          />
        </div>
      )}
    </div>
  );
}
