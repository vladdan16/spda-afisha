const options: Intl.DateTimeFormatOptions = {
  day: "numeric", // Numeric day
  month: "long", // Full month name
  hour: "numeric", // Numeric hour
  minute: "numeric", // Numeric minute
  hour12: false, // Use 24-hour time format
};
const formatter = new Intl.DateTimeFormat("ru-RU", options);

export function Poster({
  title,
  time,
  isEnrolled,
  toggle,
}: {
  title: string;
  time: Date;
  isEnrolled: boolean;
  toggle: () => void;
}) {
  return (
    <div className="w-[365px] h-64 relative">
      <div className="w-[342px] h-[191px] left-0 top-0 absolute bg-blue-800 rounded-[20px]">
        <button
          className="w-[130px] h-[34px] absolute right-0 bottom-0 mr-3 mb-3 bg-amber-500 rounded-[10px]"
          onClick={toggle}
        >
          <div className="left-[22px] top-[22px] text-white text-base font-bold font-Montserrat">
            {isEnrolled ? "Вы записаны" : "Записаться"}
          </div>
        </button>
      </div>
      <div className="w-[360px] h-[31px] left-[5px] top-[202px] absolute text-black text-2xl font-bold font-Montserrat">
        {title}
      </div>
      <div className="left-[5px] top-[236px] absolute text-zinc-800 text-base font-semibold font-Montserrat">
        {formatter.format(time)}
      </div>
    </div>
  );
}
