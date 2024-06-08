import { InfinityLoader } from "./Loader"
export default function BigLoader () {
    return (
        <main className="h-screen w-full flex items-center justify-center dark:bg-primary-dark ">
            <InfinityLoader/>
        </main>
    )
}