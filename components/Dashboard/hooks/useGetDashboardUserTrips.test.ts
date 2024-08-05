import { renderHook } from '@testing-library/react-hooks';
import { useGetDashboardUserTrips } from './useGetDashboardUserTrips'; 
import { useGetUserTripsQuery } from '@/lib/store/apiSlice/hailitApi';
import { useGetTrip } from '../TrackOrder/StatusSection/hooks/useGetTrip';


jest.mock('@/lib/store/apiSlice/hailitApi', () => ({
  useGetUserTripsQuery: jest.fn(),
}));

jest.mock('../TrackOrder/StatusSection/hooks/useGetTrip', () => ({
  useGetTrip: jest.fn(),
}));

describe('useGetDashboardUserTrips', () => {
  it('should return data correctly', () => {
    const mockTrip = { customer_id: '123' };
    const mockData = { trips: [{ trip_id: '1', drop_off_location: 'Location 1' }] };
    const mockIsLoading = false;
    const mockError = null;
    const mockSelectedTripId = '1';

    (useGetTrip as jest.Mock).mockReturnValue({
      trip: mockTrip,
      selectedTripId: mockSelectedTripId,
    });

    (useGetUserTripsQuery as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: mockIsLoading,
      error: mockError,
    });

    
    const { result } = renderHook(() => useGetDashboardUserTrips());

    
    expect(result.current.data).toEqual(mockData);
    expect(result.current.trips).toEqual(mockData.trips);
    expect(result.current.isLoading).toBe(mockIsLoading);
    expect(result.current.error).toBe(mockError);
    expect(result.current.selectedTripId).toBe(mockSelectedTripId);
  });
});
