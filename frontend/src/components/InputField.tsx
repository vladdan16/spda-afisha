export function InputField({
  type,
  placeholder,
  value,
  onChange,
}: {
  type: React.HTMLInputTypeAttribute | undefined;
  placeholder: string | undefined;
  value: string | undefined;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
}) {
  return (
    <div className="mb-8 w-full">
      <input
        type={type}
        className="w-full h-[68px] bg-white rounded-[20px] shadow p-4 text-black text-opacity-50 text-[32px] font-medium font-Montserrat"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
