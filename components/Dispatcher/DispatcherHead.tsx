import { ThemeToggle } from "../Theme/ThemeToggle";

export default function DispatcherHead({
  firstName,
  lastName,
  userRole,
}: {
  firstName: string;
  lastName: string;
  userRole: string;
}) {
  return (
    <div className="flex justify-between items-start md:justify-center gap-3 w-5/6 mb-2 top-0 left-0 right-0">
      <div className="flex gap-2 ml-1">
        <div className=" flex items-center justify-center w-16 h-16 bg-black text-white dark:bg-white dark:text-black rounded-md">
          <p className="font-bold text-sm">
            {firstName[0]}
            {lastName[0]}
          </p>
        </div>
        <span className="space-y-1">
          <h3 className="font-bold leading-4">
            {firstName} <br /> {lastName}
          </h3>
          <p className="text-[12px]">{userRole}</p>
        </span>
      </div>
      <div className="md:hidden">
        <ThemeToggle />
      </div>
    </div>
  );
}
