import { PageLayout } from "./PageLayout";

export function DashboardNavButton({
  onClick,
  current,
  children,
}: {
  onClick: () => void;
  current: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`h-[60px] px-8 bg-${
        current ? "neutral-200" : ""
      } rounded-[20px] text-black text-[27px] font-bold font-Montserrat mt-6 mb-10 mr-8`}
    >
      {children}
    </button>
  );
}

export function DashboardLayout({
  current,
  choose,
  children,
}: {
  current: "enrollments" | "events";
  choose: (chosen: "enrollments" | "events") => void;
  children: React.ReactNode;
}) {
  return (
    <PageLayout title={"Мои Ивенты"}>
      <div className="flex flex-row items-left">
        <DashboardNavButton
          onClick={() => choose("enrollments")}
          current={current === "enrollments"}
        >
          Мои записи
        </DashboardNavButton>
        <DashboardNavButton
          onClick={() => choose("events")}
          current={current === "events"}
        >
          Созданные ивенты
        </DashboardNavButton>
      </div>
      {children}
    </PageLayout>
  );
}
