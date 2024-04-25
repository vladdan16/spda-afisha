import { useEffect, useRef, useState } from "react";

export function Dropdown<T extends string>({
  value,
  values,
  onChange,
}: {
  value: T;
  values: T[];
  onChange: (value: T) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
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

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (selected: T) => {
    onChange(selected);
    setIsOpen(false);
  };

  return (
    <div className="relative w-[200px] mb-8" ref={dropdownRef}>
      <button
        type="button"
        onClick={handleToggle}
        className="w-full h-[38px] bg-white rounded-[10px] shadow-md flex items-center px-4 text-black text-opacity-60 text-lg font-medium font-Montserrat"
      >
        {value}
        <span className="ml-auto">▼</span>
      </button>
      {isOpen && (
        <div className="absolute w-full mt-1 bg-white rounded-[10px] shadow-lg z-10">
          {values.map((item) => (
            <div
              key={item}
              onClick={() => handleSelect(item)}
              className="px-4 py-2 text-lg text-black text-opacity-60 hover:bg-gray-100 rounded-[10px] cursor-pointer font-medium font-Montserrat"
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
