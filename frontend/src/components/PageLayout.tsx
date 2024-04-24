import { DefaultLayout } from "./DefaultLayout";
import { PrimaryTextBlack } from "./PrimaryText";

export function PageLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <DefaultLayout loggedIn={true}>
      <div className="px-20">
        <div className="h-[100px] flex justify-between bg-white items-center">
          <PrimaryTextBlack>{title}</PrimaryTextBlack>
        </div>
        {children}
      </div>
    </DefaultLayout>
  );
}
