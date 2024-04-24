import { Link } from "react-router-dom";
import { PageLayout } from "./PageLayout";

import * as MyEnrollmentsDashboard from "../pages/dashboard/MyEnrollments";

export function DashboardNavButton({
  link,
  current,
  children,
}: {
  link: string;
  current: boolean;
  children: React.ReactNode;
}) {
  let body: React.ReactNode;

  body = (
    <button
      className={`h-[60px] px-8 bg-${
        current ? "stone-300" : "neutral-200"
      } rounded-[20px] text-black text-[27px] font-bold font-Montserrat mt-6 mb-10`}
    >
      {children}
    </button>
  );

  if (!current) {
    body = <Link to={link}>{body}</Link>;
  }

  return body;
}

export function DashboardLayout({
  current,
  children,
}: {
  current: "enrollments";
  children: React.ReactNode;
}) {
  return (
    <PageLayout title={"Мои Ивенты"}>
      <div className="flex flex-row items-left">
        <DashboardNavButton
          link={MyEnrollmentsDashboard.path}
          current={current === "enrollments"}
        >
          Мои записи
        </DashboardNavButton>
      </div>
      {children}
    </PageLayout>
  );
}
