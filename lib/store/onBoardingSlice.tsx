import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface OnBoarding {
    stageOne: boolean,
    stageTwo: boolean,
    stageThree: boolean,
    chosenRole: string,
    onboard: boolean

}

type Onboard = boolean;
type ChosenRole = "customer" | "dispatcher";

interface OnboardingStages {
    stageOne: boolean,
    stageTwo: boolean,
    stageThree: boolean,
}

const initialState:OnBoarding = {
    stageOne: true,
    stageTwo: false,
    stageThree: false,
    chosenRole: '',
    onboard: false

}
export const onBoardingSlice = createSlice({
    name: "onBoarding state",
    initialState,
    reducers: {
        setOnboardingStages (state, action:PayloadAction<OnboardingStages>) {
            state.stageOne = action.payload.stageOne
            state.stageTwo = action.payload.stageTwo
            state.stageThree = action.payload.stageThree
        },
        setChosenRole(state, action:PayloadAction<ChosenRole>) {
            state.chosenRole = action.payload
        },
        
        setBoardingCompletion(state, action:PayloadAction<Onboard>) {
            state.onboard = action.payload
            
        },

        
    }

})

export const {setOnboardingStages, setChosenRole, setBoardingCompletion} = onBoardingSlice.actions;
