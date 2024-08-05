import { useGetMostRecentTripsQuery } from '@/lib/store/apiSlice/hailitApi';
import { act, renderHook } from '@testing-library/react-hooks';
import { useRouter } from 'next/navigation';
import { useGetRecentTrips } from './useGetRecentTrips';

// Mock the necessary modules
jest.mock('@/lib/store/apiSlice/hailitApi', () => ({
    useGetMostRecentTripsQuery: jest.fn(),
}));

jest.mock('@/lib/store/hooks', () => ({
    useAppDispatch: jest.fn(),
}));

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

describe('useGetRecentTrips', () => {
    let routerPushMock: jest.Mock;

    beforeEach(() => {
        routerPushMock = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({ push: routerPushMock });
    });

    it('should initialize with default values', () => {
        (useGetMostRecentTripsQuery as jest.Mock).mockReturnValue({
            data: null,
            isLoading: false,
            error: null,
            isSuccess: false,
        });

        const { result } = renderHook(() => useGetRecentTrips());

        expect(result.current.data).toBe(null);
        expect(result.current.trips).toBeUndefined();
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBe(null);
        expect(result.current.isSuccess).toBe(false);
        expect(result.current.tripLoading).toBe(false);
        expect(result.current.selectedTripId).toBe("");
    });

    it('should set tripLoading and selectedTripId on handleTrackTrip', () => {
        (useGetMostRecentTripsQuery as jest.Mock).mockReturnValue({
            data: null,
            isLoading: false,
            error: null,
            isSuccess: false,
        });

        const { result } = renderHook(() => useGetRecentTrips());

        act(() => {
            result.current.handleTrackTrip('cq154f');
        });

        expect(result.current.tripLoading).toBe(true);
        expect(result.current.selectedTripId).toBe('cq154f');
        expect(routerPushMock).toHaveBeenCalledWith('/dashboard/track-order/cq154f');
    });

    it('should update trips data when query is successful', () => {
        const mockData = {
            trips: [
                { id: '1', name: 'Trip 1' },
                { id: '2', name: 'Trip 2' },
            ],
        };

        (useGetMostRecentTripsQuery as jest.Mock).mockReturnValue({
            data: mockData,
            isLoading: false,
            error: null,
            isSuccess: true,
        });

        const { result } = renderHook(() => useGetRecentTrips());

        expect(result.current.data).toBe(mockData);
        expect(result.current.trips).toBe(mockData.trips);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBe(null);
        expect(result.current.isSuccess).toBe(true);
    });

    it('should handle loading state correctly', () => {
        (useGetMostRecentTripsQuery as jest.Mock).mockReturnValue({
            data: null,
            isLoading: true,
            error: null,
            isSuccess: false,
        });

        const { result } = renderHook(() => useGetRecentTrips());

        expect(result.current.isLoading).toBe(true);
        expect(result.current.data).toBe(null);
        expect(result.current.trips).toBeUndefined();
    });

    it('should handle error state correctly', () => {
        const mockError = new Error('Failed to fetch');

        (useGetMostRecentTripsQuery as jest.Mock).mockReturnValue({
            data: null,
            isLoading: false,
            error: mockError,
            isSuccess: false,
        });

        const { result } = renderHook(() => useGetRecentTrips());

        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBe(mockError);
        expect(result.current.data).toBe(null);
        expect(result.current.trips).toBeUndefined();
    });
});
