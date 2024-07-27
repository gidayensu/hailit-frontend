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
        <p className="text-sm">
          {item} <b>{currentItemsCount * page - currentItemsCount + 1}</b> to  <b>{currentItemsCount * page}</b> of <b>{total_items}</b>
        </p>
      )}
      {page === total_number_of_pages && (
        <p className="text-sm">
          {item} <b>{total_items - currentItemsCount + 1}</b> to <b>{total_items}</b>  of <b>{total_items}</b> 
        </p>
      )}
    </div>
  );
}
