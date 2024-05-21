import CustomerProfile from "../Form/CustomerProfile";

export default function SecondStage () {
    return (
        <>
          <div className="grid  grid-cols-1 w-full min-h-[300px]  p-4 gap-2 md:justify-center md:items-center -mt-3  md:w-1/2">
            <span className="flex flex-col items-start justify-start p-5 gap-2 md:items-center md:justify-center">
              <p className="font-bold text-2xl">Enter your details </p>
              <p>Send packages with ease using Hailit </p>
            </span>
            <form className="w-full space-y-6 p-3 md:flex md:flex-col md:items-center md:justify-center">
              <CustomerProfile />
            </form>

            
          </div>
          
            </>
    )
}