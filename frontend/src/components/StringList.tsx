export function StringList({
  maxHeight,
  strings,
}: {
  maxHeight: number;
  strings: string[];
}) {
  return (
    <div
      style={{ maxHeight: maxHeight }}
      className="overflow-auto w-full custom-scrollbar"
    >
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px; /* width of the entire scrollbar */
          border-radius: 20px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f0f0f0; /* color of the tracking area */
          border-radius: 20px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #b0b0b0; /* color of the scroll thumb */
          border-radius: 20px; /* roundness of the scroll thumb */
          border: 2px solid #f0f0f0; /* creates padding around scroll thumb */
        }
      `}</style>
      <ol className="list-decimal list-inside">
        {strings.map((item) => (
          <li
            key={item}
            className="text-white text-xl font-medium font-Montserrat"
          >
            {item}
          </li>
        ))}
      </ol>
    </div>
  );
}
