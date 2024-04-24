const options: Intl.DateTimeFormatOptions = {
  day: "numeric", // Numeric day
  month: "long", // Full month name
  hour: "numeric", // Numeric hour
  minute: "numeric", // Numeric minute
  hour12: false, // Use 24-hour time format
};
const formatter = new Intl.DateTimeFormat("ru-RU", options);

export function EnrollPoster({
  title,
  time,
  number_seats,
  avaliable_seats,
  isEnrolled,
  toggle,
}: {
  title: string;
  time: Date;
  number_seats: number;
  avaliable_seats: number;
  isEnrolled: boolean;
  toggle: () => void;
}) {
  return (
    <div className="w-[365px] h-64 relative">
      <div className="w-[342px] h-[191px] left-0 top-0 absolute bg-blue-800 rounded-[20px]">
        <button
          className="w-[130px] absolute right-0 bottom-0 mr-3 mb-3 p-1 bg-amber-500 rounded-[10px]"
          title={isEnrolled ? "Отписаться" : "Записаться"}
          onClick={toggle}
        >
          <div className="text-white text-base font-bold font-Montserrat">
            {isEnrolled ? "Вы записаны" : "Записаться"}
          </div>
          {!isEnrolled && (
            <div className="text-white text-[12px] font-normal font-Inter">
              {"Доступно: " + avaliable_seats + "/" + number_seats}
            </div>
          )}
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

export function GeneralPoster({
  title,
  time,
  number_seats,
  avaliable_seats,
  del,
}: {
  title: string;
  time: Date;
  number_seats: number;
  avaliable_seats: number;
  del: () => void;
}) {
  return (
    <div className="w-[365px] h-64 relative">
      <div className="w-[342px] h-[191px] left-0 top-0 absolute bg-blue-800 rounded-[20px]">
        <button
          className="w-[130px] absolute right-0 bottom-0 mr-3 mb-3 p-1 bg-amber-500 rounded-[10px]"
          onClick={del}
        >
          <div className="text-white text-base font-bold font-Montserrat">
            Удалить
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
