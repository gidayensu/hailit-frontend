import { renderHook, act } from '@testing-library/react-hooks';
import { useDeleteTrip } from './useDeleteTrip';
import { useDeleteTripMutation } from '@/lib/store/apiSlice/hailitApi';

jest.mock('@/lib/store/apiSlice/hailitApi');

describe('useDeleteTrip', () => {
  let deleteTripMock: jest.Mock;

  beforeEach(() => {
    deleteTripMock = jest.fn();
    (useDeleteTripMutation as jest.Mock).mockReturnValue([deleteTripMock, {
      isLoading: false,
      error: null,
      isSuccess: false,
    }]);
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useDeleteTrip('test-trip-id'));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.isSuccess).toBe(false);
  });

  it('should call deleteTrip with the correct tripId', async () => {
    const { result } = renderHook(() => useDeleteTrip('test-trip-id'));

    await act(async () => {
      result.current.handleDeleteTrip();
    });

    expect(deleteTripMock).toHaveBeenCalledWith('test-trip-id');
  });

  // it('should update states accordingly', async () => {
    
  //   const deleteTripMock = jest.fn();
  //   (useDeleteTripMutation as jest.Mock).mockReturnValue([deleteTripMock, {
  //     isLoading: false,
  //     error: 'Error message',
  //     isSuccess: true,
  //   }]);

  //   const { result, waitForNextUpdate } = renderHook(() => useDeleteTrip('test-trip-id'));

    
  //   act(() => {
  //     result.current.handleDeleteTrip();
  //   });

    
  //   await waitForNextUpdate();

    
  //   expect(result.current.isLoading).toBe(false);
  //   expect(result.current.error).toBe('Error message');
  //   expect(result.current.isSuccess).toBe(true);
  // });
});
