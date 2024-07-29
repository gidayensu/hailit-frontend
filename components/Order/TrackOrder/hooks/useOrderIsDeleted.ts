import { useRef } from "react";
import { useRouter } from "next/navigation";
export const useOrderIsDeleted = ({tripId}:{tripId?:string})=> {
    const orderIsDeletedRef = useRef<HTMLDialogElement>(null);
    const router = useRouter();
    const closeIsDeletedModal = ()=> {
        orderIsDeletedRef?.current?.close()
        router.push('/')
    }

    const openIsDeleteModal = ()=> {
        orderIsDeletedRef?.current?.showModal()
    }

    if(!tripId) {
        openIsDeleteModal();
    }

    return {orderIsDeletedRef, closeIsDeletedModal}
}