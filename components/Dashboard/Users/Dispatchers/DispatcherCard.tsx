import { Modal } from "@/components/Shared/Modal";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";
import { Dispatcher } from "@/lib/store/slice/tripSlice";
import Link from "next/link";
import DeleteModalCard from "../../TrackOrder/DeleteModalCard";
import { Rating } from "./AllRidersTable";
import { useDispatcherProfile } from "./hooks/useDispatcherProfile";
import { useDeleteDispatcher } from "./hooks/useDeleteDispatcher";
export default function DispatcherCard ({dispatcher, editDispatcher}: {dispatcher:Dispatcher, editDispatcher:()=>void}) {
  
  const {dispatcherRole, dispatcherId} = useDispatcherProfile()
  const { deleteError, deleteSuccess,  deleteLoading, handleDeleteDispatcher } = useDeleteDispatcher({dispatcherId, dispatcherRole});
  

  
        
    return (
      <Container className="flex gap-2 max-h-96 w-full rounded-xl flex-col items-center justify-start p-5">
        {!dispatcher && 
        <>
            <Skeleton className="w-32 rounded-full h-32 mt-2"/>
            <Skeleton className="w-32 rounded-full h-6"/>
            <Skeleton className="w-32 rounded-full h-6"/>
        </>
        }


        {
          dispatcher && <>
        <div className=" flex font-bold text-xl items-center justify-center text-white dark:text-secondary-dark rounded-full h-24 w-24 bg-primary-color dark:bg-white mt-4">
          <p>
            {dispatcher?.first_name[0]}
            {dispatcher?.last_name[0]}
          </p>
        </div>
        <div
          className={`w-1/3 rounded-xl bg-green-200 border border-green-500 text-green-800 font-medium h-6 flex items-center justify-center text-[13px] `}
        >
          {<p>{dispatcher?.user_role}</p>}
        </div>
        <div className="flex flex-col items-center justify-center gap-2 w-full ">
          <p className="font-semibold">
            {dispatcher?.first_name} {dispatcher?.last_name}
          </p>
          {/* <div className="flex gap-1 items-center justify-center text-sm text-slate-500 -mt-1">
              <RiMapPinLine className="text-md" />
              <p>Bantama Ahenebronum</p>
            </div> */}

          <div className="flex flex-col  text-secondary-dark dark:text-white  gap-1 items-center justify-center  text-sm">
          <span><b>Email:</b>  <Link className="underline hover:text-primary-color" href="mailto:{selectedUser?.email}">{dispatcher?.email}</Link></span>
          <span><b>Phone:</b> <Link className="underline hover:text-primary-color" href="tel:{selectedUser?.phone_number}"> {dispatcher?.phone_number} </Link></span>
            <p className="flex gap-1 items-center justify-center"> <b>Rating:</b><Rating rating={dispatcher?.cumulative_rating}/>  ({dispatcher?.rating_count})</p>
            <p> <b>Assigned Vehicle:</b>{dispatcher?.vehicle?.vehicle_name}</p>
          </div>
        </div>

        {/* Buttons for Edit or Delete */}
        <div className="flex gap-2 mt-6 items-center">
          <Button onClick={editDispatcher} variant={"empty"}
                className="dark:text-slate-50    hover:text-primary-color dark:hover:text-primary-color "> Edit {dispatcher?.user_role} </Button>
          <p>|</p>
          {/* Delete Modal */}
          <Modal
            dialogTriggerElement={
              <Button
                variant={"empty"}
                className="text-red-500  hover:text-red-700"
              >
                Delete {dispatcher?.user_role}
              </Button>
            }

          >
            <DeleteModalCard
              itemId={`${dispatcher?.first_name} ${dispatcher?.last_name}`}
              item={dispatcher?.user_role}
              deleteFn={handleDeleteDispatcher}
              error={deleteError}
              isSuccess={deleteSuccess}
              loading={deleteLoading}
            />
          </Modal>
        </div>
          </>
        }
      </Container>
    );
}