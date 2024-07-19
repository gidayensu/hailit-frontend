"use client";

//main components
import EditCustomerProfile from "@/components/Form/EditCustomerProfile";
import MiddleSectionContainer from "@/components/Shared/MiddleSectionContainer";
import TopSectionContainer from "@/components/Shared/TopSectionContainer";
//ui components
import { Button } from "@/components/ui/button";

export default function EditProfile() {
  
  

  return (
    <>
      <main className="flex min-h-screen flex-col items-center gap-10 ">
        <TopSectionContainer className="">
          <span className="text-5xl font-bold ">Edit Profile</span>
          <p className="text-lg">Edit your details and preferences</p>
        </TopSectionContainer>

        <MiddleSectionContainer className="flex flex-col justify-center items-center gap-6 bg-white w-full -mt-20 rounded-tr-[50px] p-10 mb-20">
          <div className="w-full flex flex-col items-center justify-center gap-4">
            <EditCustomerProfile />

            <Button
              type="submit"
              className="max-w-sm w-full h-14"
              form="customerProfileUpdate"
            >
              Save
              
            </Button>
          </div>
        </MiddleSectionContainer>
      </main>
    </>
  );
}
