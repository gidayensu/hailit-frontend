import Link from "next/link"
import { Button } from "../ui/button"

export default function ErrorComponent ({errorCode, errorMessage, onClickFunc}:{errorCode:number, errorMessage: string, onClickFunc?: ()=>void}) {
    return (
        <section className="flex flex-col items-center justify-center bg-slate-50 dark:bg-primary-dark min-h-screen gap-4">
           <h2 className="font-bold text-5xl">{errorCode}</h2>
          <h2 className="font-semibold text-2xl">{errorMessage}</h2>
          <Link href={"/"} onClick={onClickFunc}>
            
            <Button>Return Home </Button>
          </Link>
        </section>
    )
}