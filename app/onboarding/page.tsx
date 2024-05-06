'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";

import { Separator } from "@/components/ui/separator";
import { FiCheck } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import userAnimation from "@/public/animations/user-animation.json"
import riderAnimation from "@/public/animations/rider-animation.json"


type Onboarding = {
    stageOne : boolean,
    stageTwo: boolean,
    stageThree: boolean
}

type SelectedUserRole = {
    customer: boolean,
    dispatcher: boolean
}
export default function Onboarding (){
    const router = useRouter();

    const userHasNoRole = true; //will be determined from the data that would be fetched from the database and stored in the redux store;
    if (!userHasNoRole) {
        router.push('/')
    }

    const [onBoardingStage, setOnBoardingStage] = useState<Onboarding>({
        stageOne: true,
        stageTwo: false,
        stageThree: false
    });
    
    const [selectedUserRole, setSelectedUserRole] = useState<SelectedUserRole>({
        customer: false,
        dispatcher: false
    })

    
    const onBoardingStageHandler = (stage:'first' | 'second' | 'third')=> {
       
        stage === 'first' ?
            setOnBoardingStage((prevState)=> ({
                ...prevState, stageTwo: false
            }))
            :
        
        stage === 'second' ?
            setOnBoardingStage((prevState)=> ({
                ...prevState, stageTwo: true, stageThree: false
            }))
            :
            
            setOnBoardingStage((prevState)=> ({
                ...prevState, stageThree: true
            })) 
            
    }

    const selectedUserRoleHandler = (userRole: 'customer' | 'dispatcher')=> {
        userRole === 'customer' ?
        setSelectedUserRole(()=> ({
            customer: true,
            dispatcher: false
        }))

        :

        setSelectedUserRole(()=> ({
            customer: false,
            dispatcher: true
        }))
    }

    return(
        <main className="flex flex-col  items-center w-full max-h-screen p-5 bg-slate-50 mb-20 dark:bg-[#1e1e1e]">
            {/* Onboarding stages 1 - 3 starts here */}
            <div className="flex items-center justify-center">
                
                    <div className={`flex items-center justify-center h-10 w-10 border-2 border-slate-800 rounded-full text-sm ${onBoardingStage.stageOne ? 'bg-blue-500 text-white border-white': 'border-opacity-50'}`}>
                           {onBoardingStage.stageOne ? <FiCheck/> : <p className="opacity-50 font-bold">1</p>}
                    </div>
                <Separator className={`w-16 h-1  ${onBoardingStage.stageOne ? 'bg-blue-500': 'bg-slate-800 bg-opacity-50'}`}/>
                <div className={`flex items-center justify-center h-10 w-10 border-2 border-slate-800 rounded-full text-sm ${onBoardingStage.stageTwo ? 'bg-blue-500 text-white border-white': 'border-opacity-50'}`}>
                {onBoardingStage.stageTwo ? <FiCheck/> : <p className="opacity-50 font-bold">2</p>}
                    </div>
                    <Separator className={`w-16 h-1  ${onBoardingStage.stageTwo ? 'bg-blue-500': 'bg-slate-800 bg-opacity-50'}`}/>
                    <div className={`flex items-center justify-center h-10 w-10 border-2 border-slate-800 rounded-full text-sm ${onBoardingStage.stageThree ? 'bg-blue-500 text-white border-white': 'border-opacity-50'}`}>
                {onBoardingStage.stageThree ? <FiCheck/> : <p className="opacity-50 font-bold">3</p>}
                    </div>
            </div>

                {/* Onboarding stage 1 */}
            {
                onBoardingStage.stageOne && !onBoardingStage.stageTwo && !onBoardingStage.stageThree && (
                    <>
                    <div className="grid grid-rows-4 grid-cols-1 w-full min-h-[400px] p-5 gap-5  justify-between">
                        <div className="flex gap-4 p2 row-start-2 row-end-4">
                            <div className="w-1/2 ">
                                <div onClick={()=>selectedUserRoleHandler('customer')} className={`flex flex-col items-center w-full h-52 rounded-xl border border-blue-500 hover:bg-blue-500 ${selectedUserRole.customer ? 'bg-blue-500' : 'bg-white'}`}>
                                <div className="w-full h-44 rounded-xl border border-blue-500 bg-white dark:bg-[#121212] object-contain">
                                    <Lottie animationData={userAnimation} className="mt-4 object-contain"/>
                                </div>
                                <span className={`flex items-center justify-center -mt-4  border border-rose-500  dark:text-blue-500 h-8 w-8 rounded-full   dark:bg-slate-50 ${selectedUserRole.customer ? 'bg-rose-500 text-white' : 'text-rose-500'}`}>
                                    <FiCheck/>

                                </span>
                                    
                                </div>
                            </div>
                            <div className="w-1/2">
                            <div onClick={()=>selectedUserRoleHandler('dispatcher')} className={`flex flex-col items-center w-full h-52 rounded-xl border border-blue-500 hover:bg-blue-500 ${selectedUserRole.dispatcher ? 'bg-blue-500' : 'bg-white'}`}>
                                <div className="flex items-center justify-center w-full h-44 rounded-xl border border-blue-500 bg-white dark:bg-[#121212] object-contain">
                                    <Lottie animationData={riderAnimation} className="w-96 object-contain -ml-8" />
                                </div>
                                <span className={`flex items-center justify-center -mt-4  border border-rose-500  dark:text-blue-500 h-8 w-8 rounded-full   dark:bg-slate-50 ${selectedUserRole.dispatcher ? 'bg-rose-500 text-white' : 'text-rose-500 bg-white'}`}>
                                    <FiCheck/>

                                </span>
                                    
                                </div>
                            </div>
                            
                        </div>
                        
                    </div>
                    <Button className="w-full bottom-0 row-start-7" onClick={()=>{onBoardingStageHandler('second')}}>Next</Button>
                    </>
                )
            }
                {/* Onboarding stage 2 */}
{
                onBoardingStage.stageOne && onBoardingStage.stageTwo && !onBoardingStage.stageThree &&(
                    <div className="w-full">
                        <div className="w-full p-5 flex items-center justify-center gap-4">

                        
                        <Button variant={'outline'} className="w-full" onClick={()=>{onBoardingStageHandler('first')}}>Previous</Button>
                        <Button className="w-full" onClick={()=>{onBoardingStageHandler('third')}}>Next</Button>
                        </div>
                    </div>
                )
            }
            {/* Onboarding stage 3 */}
{
                onBoardingStage.stageOne && onBoardingStage.stageTwo && onBoardingStage.stageThree && (
                    <div className="w-full">
                        <div className="w-full p-5 flex items-center justify-center gap-4">
                        <Button variant={'outline'} className="w-full" onClick={()=>{onBoardingStageHandler('second')}}>Previous</Button>
                        <Button className="w-full" onClick={()=>{onBoardingStageHandler('third')}}>Complete</Button>
                        </div>
                    </div>
                )
            }
        </main>
    )
}

