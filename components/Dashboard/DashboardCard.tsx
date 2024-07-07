
import Container from "../ui/container"
export default function DashboardCard ({title, subTitle, number, children}: {title: string, subTitle?: string, number: number, children?:React.ReactNode}) {
    return (
        <Container className="flex flex-col gap-2 w-full md:w-1/4 h-28 rounded-xl p-4 animate-in md:slide-in-from-right slide-in-from-bottom duration-100 justify-between ">
          <div className="flex justify-between">
            <div className="">
              <h3 className="font-semibold"> {title}</h3>
              <h3 className="text-[12px] text-slate-400 -mt-1">
                {/* {subTitle} */}
              </h3>
            </div>
          </div>
          <div className="flex flex-col ">
            <h2 className="text-2xl font-bold">{number}</h2>
            {children}
          </div>
        </Container>
    )
}