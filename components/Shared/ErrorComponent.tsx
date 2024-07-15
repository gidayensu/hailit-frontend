'use client'
import Link from "next/link"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
export default function ErrorComponent ({errorCode, errorMessage, onClickFunc, url}:{errorCode:number, errorMessage: string, onClickFunc?: ()=>void, url:string}) {
  const router = useRouter();
    return (
        <section className="flex flex-col items-center justify-center bg-slate-50 dark:bg-primary-dark min-h-screen gap-4">
           <h2 className="font-bold text-5xl">{errorCode}</h2>
          <h2 className="font-semibold text-2xl">{errorMessage}</h2>
            <Button className="w-44"  onClick={()=>router.back()}>Back </Button>
          <Link href={url} onClick={onClickFunc} >
            
            <Button className="w-44" variant={'outline'}> Home </Button>
          </Link>
        </section>
    )
}