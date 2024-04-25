export function NumberInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue)) {
      onChange(newValue);
    }
  };

  return (
    <div className="flex items-center mb-8">
      <input
        type="number"
        className="w-[70px] h-[38px] text-center border-y-2 border-r-2 border-l-0 px-2 text-lg text-black text-opacity-50 font-medium rounded-[10px] font-Montserrat"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
