import { Modal } from "@/components/Shared/Modal";
import { useDeleteUser } from "./hooks/useDeleteUser";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import DeleteModalCard from "../TrackOrder/DeleteModalCard";
import { User } from "./hooks/useGetAllUsers";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
export default function DashboardUserCard ({selectedUser, editUser}: {selectedUser:User, editUser:()=>void}) {
  
  const { isLoading, error, isSuccess, handleDeleteUser } = useDeleteUser(selectedUser?.user_id);

    return (
      <Container className="flex gap-2 max-h-96 w-full rounded-xl flex-col items-center justify-start p-5">
        {!selectedUser && 
        <>
            <Skeleton className="w-32 rounded-full h-32 mt-2"/>
            <Skeleton className="w-32 rounded-full h-6"/>
            <Skeleton className="w-32 rounded-full h-6"/>
        </>
        }


        {
          selectedUser && <>
        <div className=" flex font-bold text-xl items-center justify-center text-white dark:text-secondary-dark rounded-full h-24 w-24 bg-primary-color dark:bg-white mt-4">
          <p>
            {selectedUser?.first_name[0]}
            {selectedUser?.last_name[0]}
          </p>
        </div>
        <div
          className={`w-1/3 rounded-xl bg-green-200 border border-green-500 text-green-800 font-medium h-6 flex items-center justify-center text-[13px]`}
        >
          {<p>{selectedUser?.user_role}</p>}
        </div>
        <div className="flex flex-col items-center justify-center gap-2 w-full ">
          <p className="font-semibold">
            {selectedUser?.first_name} {selectedUser?.last_name}
          </p>
          {/* <div className="flex gap-1 items-center justify-center text-sm text-slate-500 -mt-1">
              <RiMapPinLine className="text-md" />
              <p>Bantama Ahenebronum</p>
            </div> */}

          <div className="flex flex-col justify-center items-center  text-secondary-dark dark:text-white    gap-1   text-sm w-full">
          <span><b>Email:</b>  <Link className="underline hover:text-primary-color" href="mailto:{selectedUser?.email}">{selectedUser?.email}</Link></span>
          <span><b>Phone:</b> <Link className="underline hover:text-primary-color" href="tel:{selectedUser?.phone_number}"> {selectedUser?.phone_number} </Link></span>

          </div>
        </div>

        {/* Buttons for Edit or Delete */}
        <div className="flex gap-2 mt-2">
          <Button onClick={editUser}> Edit {selectedUser?.user_role}</Button>

          {/* Delete Modal */}
          <Modal
            dialogTriggerElement={
              <Button
                variant={"empty"}
                className="text-red-500 border border-red-500 hover:text-white hover:bg-red-500"
              >
                Delete {selectedUser?.user_role}
              </Button>
            }

          >
            <DeleteModalCard
              itemId={`${selectedUser?.first_name} ${selectedUser?.last_name}`}
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