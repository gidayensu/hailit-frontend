import EditCustomerProfile from "../Form/EditCustomerProfile";

export default function SecondStage() {
  return (
    <>
      <div className="grid  grid-cols-1 w-full min-h-[300px]  p-4 gap-2 md:justify-center md:items-center -mt-3  md:w-1/2">
        <span className="flex flex-col items-start justify-start p-5 gap-2 md:items-center md:justify-center">
          <p className="font-bold text-2xl">Enter your details </p>
          <p>These details will be used to set up your account </p>
        </span>
        <div className="flex items-center justify-center w-full">
          <EditCustomerProfile />
        </div>
      </div>
    </>
  );
}
