'use client'
import {
  TableHead,
  TableRow
} from "@/components/ui/table";
import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";
export default function TablesHeadings({
  tableHeadings,
  sortDetails,
  handleSort,
  sortableHeadings = tableHeadings
}: {
  tableHeadings: any[];
  sortDetails: {
    column: any;
    sortDirection: "ASC" | "DESC";
};
sortableHeadings?: any[];
handleSort: (tableHeading: any) => void;
}) {

const handleColumnSort = (tableHeading:string)=> {
  if(!sortableHeadings.includes(tableHeading)) {
    return null
  }

  handleSort(tableHeading)
}
  
  return (
    <>
            <TableRow>
              {tableHeadings.map((tableHeading) => (
                <TableHead
                  key={tableHeading}
                  onClick={() => handleColumnSort(tableHeading)}
                >
                  <div className="flex items-center  gap-1 w-40">
                    {tableHeading}
                    { sortableHeadings.includes(tableHeading) &&
                      <div className="flex items-center flex-col text-md">
                      <BsCaretUpFill
                        className={`${
                          sortDetails.column === tableHeading &&
                          sortDetails.sortDirection === "ASC"
                            ? "text-green-500"
                            : "text-black opacity-20 dark:text-slate-100"
                        }`}
                      />
                      <BsCaretDownFill
                        className={`${
                          sortDetails.column === tableHeading &&
                          sortDetails.sortDirection === "DESC"
                            ? "text-green-500"
                            : "text-black opacity-20 dark:text-slate-100"
                        }`}
                      />
                    </div> 
                      }
                  
                  </div>
                </TableHead>
              ))}
            </TableRow>
      
    </>
  );
}








