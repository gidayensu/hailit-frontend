import { Modal } from "@/components/Shared/Modal";
import { Skeleton } from "@/components/ui/skeleton";
import { useDeleteUser } from "../hooks/useDeleteUser";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import DeleteModalCard from "../../TrackOrder/DeleteModalCard";


export default function DispatcherCard ({dispatcher, editDispatcher}: {dispatcher:any, editDispatcher:()=>void}) {
  
  const { isLoading, error, isSuccess, handleDeleteUser } = useDeleteUser(dispatcher?.user_id);

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
          className={`w-1/3 rounded-xl bg-green-200 border border-green-500 text-green-800 font-medium h-6 flex items-center justify-center text-[13px]`}
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

          <div className="flex flex-col  text-secondary-dark dark:text-white  gap-1 items-start justify-center  text-sm">
            <p> <b>Email:</b>  {dispatcher?.email}</p> 
            <p> <b>Phone:</b>{dispatcher?.phone_number}</p>
            <p> <b>Rating:</b>{dispatcher?.rating_count}</p>
            <p> <b>Assigned Vehicle:</b>{dispatcher?.vehicle_name}</p>
          </div>
        </div>

        {/* Buttons for Edit or Delete */}
        <div className="flex gap-2 mt-2">
          <Button onClick={editDispatcher}> Edit User</Button>

          {/* Delete Modal */}
          <Modal
            dialogTriggerElement={
              <Button
                variant={"empty"}
                className="text-red-500 border border-red-500 hover:text-white hover:bg-red-500"
              >
                Delete User
              </Button>
            }

          >
            <DeleteModalCard
              itemId={`${dispatcher?.first_name} ${dispatcher?.last_name}`}
              item="User"
              deleteFn={handleDeleteUser}
              error={error}
              isSuccess={isSuccess}
              loading={isLoading}
            />
          </Modal>
        </div>
          </>
        }
      </Container>
    );
}