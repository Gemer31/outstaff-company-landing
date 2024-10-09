import { Link } from "@/i18n/routing";

interface ITitleContainerProps {
  title: string;
  navLink?: {
    title: string;
    url: string;
  };
  children: React.ReactNode;
}

export function TitleContainer({
  title,
  navLink,
  children,
}: ITitleContainerProps) {
  return (
    <div className="w-full py-4">
      <div
        className={
          "mb-4 flex items-center " +
          (navLink ? "justify-between" : "justify-center")
        }
      >
        <h2 className="text-3xl font-bold text-center">{title}</h2>

        {navLink ? <Link className="hover:underline text-custom-red-1" href={navLink.url}>{navLink.title}</Link> : <></>}
      </div>
      {children}
    </div>
  );
}
