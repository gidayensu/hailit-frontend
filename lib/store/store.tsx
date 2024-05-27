import {configureStore} from '@reduxjs/toolkit';
import { supabaseAuthSlice } from './slice/authSlice';
import { userSlice } from './slice/userSlice';
import { onBoardingSlice } from './slice/onBoardingSlice';
import { formSlice } from './slice/formSlice';
import { deliveryChoiceSlice } from './slice/deliveryChoicesSlice';
import { trackOrderSlice } from './slice/trackOrderSlice';
import { tripApi } from './apiSlice/tripApi';

export const store = configureStore({
        reducer: {
            auth: supabaseAuthSlice.reducer,
            user: userSlice.reducer,
            onBoarding: onBoardingSlice.reducer,
            form: formSlice.reducer,
            deliveryChoices: deliveryChoiceSlice.reducer,
            trackOrder: trackOrderSlice.reducer,
            [tripApi.reducerPath] : tripApi.reducer
        },

        middleware: (getDefaultMiddleware) => 
                getDefaultMiddleware({}).concat([tripApi.middleware])
    })



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

