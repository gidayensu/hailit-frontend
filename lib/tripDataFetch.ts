import { sessionAccessToken } from "./supabaseAuth";
import { getFetch } from "./fetch";

export const getTripData = async ({trip_id}:{trip_id: string|string[]}) => {
    try {

        const url = `https://hailit-backend.onrender.com/api/v1/trip/user-trip/${trip_id}`
          const accessToken = await sessionAccessToken();
          const bearerToken = `bearer ${accessToken}`
        const trip =  await getFetch({url, bearerToken});
        if(trip.error) {
            return {error:trip.error}
        }
        return trip;
    } catch (err) {
        return {error : `Error occurred fetching trip data: ${err}`}
    }
  }