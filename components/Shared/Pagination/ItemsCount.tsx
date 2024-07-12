export default function ItemsCount({
  page,
  total_number_of_pages,
  total_items,
  currentItemsCount,
  item
}: {
  item: string;
  page: number;
  total_number_of_pages: number;
  currentItemsCount: number;
  total_items: number;
}) {
  return (
    <div className="w-full my-2">
      {page !== total_number_of_pages && (
        <p className="text-[12px]">
          {item} {currentItemsCount * page - currentItemsCount + 1} to  {currentItemsCount * page} of {total_items}
        </p>
      )}
      {page === total_number_of_pages && (
        <p className="text-[12px]">
          {item} {total_items - currentItemsCount + 1} to {total_items}  of {total_items}
        </p>
      )}
    </div>
  );
}
