export function Poster({
  title,
  subtitle,
  isEnrolled,
  toggle,
}: {
  title: string;
  subtitle: string;
  isEnrolled: boolean;
  toggle: () => void;
}) {
  return (
    <div className="w-[365px] h-64 relative">
      <div className="w-[342px] h-[191px] left-0 top-0 absolute bg-blue-800 rounded-[20px]">
        <button
          className="w-[143px] h-[34px] absolute right-0 bottom-0 mr-3 mb-7"
          onClick={toggle}
        >
          <div className="w-[143px] h-[34px] absolute bg-amber-500 rounded-[10px]" />
          <div className="absolute left-[22px] top-[22px] text-white text-base font-bold font-Montserrat">
            {isEnrolled ? "Вы записаны" : "Записаться"}
          </div>
        </button>
      </div>
      <div className="w-[360px] h-[31px] left-[5px] top-[202px] absolute text-black text-2xl font-bold font-Montserrat">
        {title}
      </div>
      <div className="left-[5px] top-[236px] absolute text-zinc-800 text-base font-semibold font-Montserrat">
        {subtitle}
      </div>
    </div>
  );
}
