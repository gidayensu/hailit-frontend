import { Skeleton } from "../ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

export default function SkeletonTable({
  rows,
  cells,
}: {
  rows: number;
  cells: number;
}) {
  const skeletons = new Array(rows).fill(null); // Properly fill the array
  const tableCells = new Array(cells).fill(null);
  return (
    <>
      {skeletons.map((_, index) => (
        <TableRow key={index}>
          {tableCells.map((_, index) => (
            <TableCell>
              <Skeleton className="h-4 w-16" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}
