import { Button } from "@/components/ui/button";
export default function ClientTripsPagination ({currentPage, prevPage, nextPage, totalPages}:{currentPage:number; totalPages:number; prevPage:()=>void; nextPage:()=>void}) {
    
    return (
        <div className="w-full flex justify-between items-center gap-2 mt-4">
            <div className="w-full text-sm">
                <p>Page <b>{currentPage}</b> of <b>{totalPages}</b> </p>
            </div>
            <div className="w-full flex items-center justify-end">

            <Button
              variant={"empty"}
              className="w-20 hover:text-primary-color"
              onClick={() => prevPage()}
              disabled={currentPage===1}
            >
              Previous
            </Button>
            <p>|</p>
            <Button
              variant={"empty"}
              className="w-20 hover:text-primary-color"
              onClick={() => nextPage()}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
            </div>
    )
}