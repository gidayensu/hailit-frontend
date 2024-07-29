import {
  PackageType,
  TripArea,
  TripMedium,
  TripStatus,
  TripType,
} from "@/components/Order/types/Types";
import {
  useGetTripCountsByMonthQuery,
  useGetTripMonthsQuery
} from "@/lib/store/apiSlice/hailitApi";

export type TripColumn =
  | "trip_status"
  | "package_type"
  | "trip_area"
  | "trip_medium"
  | "trip_type";

interface BaseEndPoint {
  trip_column: TripColumn;
}

interface EndPointWithTripStatus extends BaseEndPoint {
  trip_column: "trip_status";
  trip_column_condition: TripStatus;
}

interface EndPointWithPackageType extends BaseEndPoint {
  trip_column: "package_type";
  trip_column_condition: PackageType;
}

interface EndPointWithTripMedium extends BaseEndPoint {
  trip_column: "trip_medium";
  trip_column_condition: TripMedium;
}

interface EndPointWithTripType extends BaseEndPoint {
  trip_column: "trip_type";
  trip_column_condition: TripType;
}

interface EndPointWithTripArea extends BaseEndPoint {
  trip_column: "trip_area";
  trip_column_condition: TripArea;
}

export type EndPoint =
  | EndPointWithPackageType
  | EndPointWithTripArea
  | EndPointWithTripMedium
  | EndPointWithTripStatus
  | EndPointWithTripType;

export const useAnalytics = (endpoint: EndPoint) => {

  // const [fetchedMonths, setFetchedMonths] = useState<[]>([]);
  const {
    data: conditionalMonths,
    isLoading: conditionalDataLoading,
    error: conditionalDataError,
  } = useGetTripCountsByMonthQuery(
    `trip_column=${endpoint.trip_column}&${endpoint.trip_column}=${endpoint.trip_column_condition}`,
    {
      pollingInterval: 5000,
      skipPollingIfUnfocused: true,
    }
  );

  const conditionalMonthsData = conditionalMonths?.tripCounts;
  const {
    data: totalMonths,
    isLoading: totalMonthsDataLoading,
    error: totalMonthsDataError,
  } = useGetTripCountsByMonthQuery(``, {
    pollingInterval: 5000,
    skipPollingIfUnfocused: true,
  });

  const totalMonthsData = totalMonths?.tripCounts;

  const {
    data: months,
    isLoading: tripMonthsLoading,
    error: tripMonthsError,
  } = useGetTripMonthsQuery("");
const tripMonths = months?.tripMonths
  
  return {
    tripMonths,
    tripMonthsLoading,
    tripMonthsError,
    totalMonthsData,
    conditionalMonthsData,
    conditionalDataLoading,
    totalMonthsDataError,
    conditionalDataError,
    totalMonthsDataLoading,
  };
};
