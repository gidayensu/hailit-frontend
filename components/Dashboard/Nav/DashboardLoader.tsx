import { InfinityLoader } from "../../Shared/Loader"
export default function DashboardLoader () {
    return (
        <main className="h-screen w-full flex items-center justify-center dark:bg-primary-dark ">
            <InfinityLoader/>
        </main>
    )
}