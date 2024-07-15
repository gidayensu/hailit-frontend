import Loader from "../Shared/Loader"
export default function DashboardTableItemLoader () {
    return (
        <div className="absolute flex items-center justify-center w-full mt-4">
                <Loader color="dark:text-white text-blue-500"/>
            </div>
    )
}