export const ItemsSelectorNoIcons = ({
  item,
  setSelectedItem,
  selectedItem,
  className,
}: {
  item: string;
  setSelectedItem: (item: string) => void;
  selectedItem: string;
  className: string;
}) => {
  return (
    <div
      className={`${className} flex flex-col items-center p-2 group hover:bg-primary-color text-primary-color hover:text-white font-bold rounded-md border border-primary-color hover:border-none cursor-pointer ${
        item === selectedItem
          ? "bg-primary-color  text-white border-none"
          : ""
      }`}
      onClick={() => setSelectedItem(item)}
    >
      <p className="text-[13px] group-hover:text-white">{item}</p>
    </div>
  );
};
