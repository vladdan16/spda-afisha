const EnrollPoster_options: Intl.DateTimeFormatOptions = {
  day: "numeric", // Numeric day
  month: "long", // Full month name
  hour: "numeric", // Numeric hour
  minute: "numeric", // Numeric minute
  hour12: false, // Use 24-hour time format
};
const EnrollPoster_formatter = new Intl.DateTimeFormat(
  "ru-RU",
  EnrollPoster_options
);

export function EnrollPoster({
  title,
  time,
  number_seats,
  avaliable_seats,
  place,
  isEnrolled,
  toggle,
}: {
  title: string;
  time: Date;
  number_seats: number;
  avaliable_seats: number;
  place: string | null;
  isEnrolled: boolean;
  toggle: () => void;
}) {
  return (
    <div className="w-[390px] h-64 relative">
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
        {EnrollPoster_formatter.format(time) +
          (place != null ? ", " + place : "")}
      </div>
    </div>
  );
}

const GeneralPoster_options: Intl.DateTimeFormatOptions = {
  weekday: "short", // short name of the day
  year: "numeric",
  month: "long", // full name of the month
  day: "numeric",
  hour: "2-digit", // two-digit hour
  minute: "2-digit", // two-digit minute
  hourCycle: "h23", // 24-hour cycle
};
const GeneralPoster_formatter = new Intl.DateTimeFormat(
  "ru-RU",
  GeneralPoster_options
);

export function GeneralPoster({
  title,
  place,
  time,
  del,
}: {
  title: string;
  place: string | null;
  time: Date;
  del: () => void;
}) {
  return (
    <div className="w-[280px] h-[410px] bg-neutral-200 rounded-[20px] flex flex-col">
      <div className="flex items-center p-2">
        <img
          src="/Calendar.png"
          alt="calendar"
          className="w-[37.16px] h-[43.81px]"
        />
        <div className="text-black text-base font-semibold font-Montserrat ml-2">
          {GeneralPoster_formatter.format(time)}
        </div>
      </div>
      <div className="bg-blue-800 h-[211px]"></div>
      <div className="flex flex-grow">
        <div className="text-black text-base font-bold font-Montserrat px-6 py-3 w-full">
          {title}
        </div>
      </div>
      <div className="flex justify-between px-3 mb-4 flex-shrink">
        <div className="flex items-center flex-shrink">
          <img
            src="/PlaceMarker.png"
            alt="place"
            className="w-[27.12px] h-[30.78px]"
          />
          <div className="text-black text-base font-semibold font-Montserrat ml-2">
            {place || "Место не указано"}
          </div>
        </div>
        <button onClick={del}>
          <img alt="delete" className="w-10 h-10" src="/Delete.png" />
        </button>
      </div>
    </div>
  );
}
