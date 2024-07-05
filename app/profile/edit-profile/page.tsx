'use client'
import { useAppSelector } from "@/lib/store/hooks";

//main components
import TopSectionContainer from "@/components/Shared/TopSectionContainer";
import MiddleSectionContainer from "@/components/Shared/MiddleSectionContainer";
import EditCustomerProfile from "@/components/Form/EditCustomerProfile";
//ui components
import { Button } from "@/components/ui/button";
import { useCustomerProfile } from "@/components/Form/hooks/useCustomerProfile";
import Loader from "@/components/Shared/Loader";
import { useState } from "react";
export default function EditProfile() {
  //redirect users who are not customers
  const [loading, setLoading] = useState<boolean>(false)
  
  

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

            <Button type="submit" className="max-w-sm w-full h-14" form="customerProfileUpdate" >
              {loading? <Loader/> : `Save`}
            </Button>
          </div>
        </MiddleSectionContainer>
      </main>
    </>
  );
}
