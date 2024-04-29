"use client";


import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


export default function Settings() {

 
  return (
    <>
      <main className="flex min-h-screen flex-col items-center gap-10 ">
        <div className="flex flex-col items-start justify-center gap-2 w-full h-80 bg-slate-800  p-4 text-white ">
          <span className="text-5xl font-bold ">Settings</span>
          <p className="text-lg">Edit your details and preferences</p>
        </div>

        <div className="flex flex-col justify-center items-center gap-6 bg-white w-full -mt-20 rounded-tr-[50px] p-10">
          
            <form
              
              className="w-full space-y-6"
            >
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <h3 className="mb-4 text-lg font-medium">First Name</h3>
                        <Input  type="text" placeholder="First Name" className="h-14" />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <h3 className="mb-4 text-lg font-medium">Last Name</h3>
                        <Input  type="text" placeholder="Last Name" className="h-14" />
                    </div>
              </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                        <h3 className="mb-4 text-lg font-medium">Email</h3>
                        <Input  type="email" placeholder="email@example.com" className="h-14" />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                        <h3 className="mb-4 text-lg font-medium">Phone Number</h3>
                        <Input  type="number" placeholder="024 123 4567" className="h-14" />
                    </div>
                <div>
                
              </div>

              <Button type="submit" className="w-full h-14">
                Submit
              </Button>
            </form>
          
        </div>
      </main>
    </>
  );
}
