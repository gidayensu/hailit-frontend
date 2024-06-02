
export default function MiddleSectionContainer({
  children,
  className,
}: {
  children: any;
  className: string;
}) {
  return (
    <div
      className={`gap-3 bg-white dark:bg-primary-dark  w-full -mt-20 rounded-tr-[50px] md:rounded-none ${className}`}
    >
      {children}
    </div>
  );
}
