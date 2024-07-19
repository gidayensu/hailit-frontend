import ModalCard from "@/components/Shared/ModalCard";
import { MdOutlineError } from "react-icons/md";
import { PiCheckCircleFill } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";
export default function DeleteModalCard({
  itemId,
  item,
  loading,
  deleteFn,
  error,
  isSuccess,
}: {
  itemId: string;
  item: string;
  loading?: boolean;
  error?: any;
  isSuccess?: boolean;
  deleteFn: () => void;
}) {
  return (
    <ModalCard
      cancelFunc={() => {}}
      confirmFunc={deleteFn}
      loading={loading}
      error={error}
      isSuccess={isSuccess}
    >
      <div className="flex flex-col items-center justify-center">
        {!error && !isSuccess && (
          <>
            <span className="mb-4 flex items-center justify-center h-12 w-12 rounded-full bg-red-200">
              <RiDeleteBin6Line className="text-red-500 text-2xl" />
            </span>
            <h2 className="text-center text-lg mb-2 animate-in slide-in-from-bottom duration-100">
              Permanently delete <b>{itemId} </b> ?
            </h2>
            <h3 className="text-center text-sm  text-red-500 animate-in slide-in-from-bottom duration-150">
              This is irreversible!
            </h3>
          </>
        )}
        {error && (
          <>
            <span className="mb-4 flex items-center justify-center h-9 w-9 rounded-full bg-red-200">
              <MdOutlineError className="text-red-500 text-2xl" />
            </span>
            <h2 className="text-center text-lg mb-2 animate-in slide-in-from-bottom duration-100">
              Error occcurred deleting {item.toLowerCase()}: <b>{itemId}</b>
            </h2>
          </>
        )}
        {isSuccess && (
          <>
            <span className="mb-4 flex items-center justify-center h-9 w-9 rounded-full bg-green-200">
              <PiCheckCircleFill className="text-green-500 text-2xl" />
            </span>
            <h2 className="text-center text-lg mb-2 animate-in slide-in-from-bottom duration-100">
              {item} successfully deleted!
            </h2>
          </>
        )}
      </div>
    </ModalCard>
  );
}
