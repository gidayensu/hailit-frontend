import { renderHook, act } from '@testing-library/react-hooks';
import { usePrefetchData } from './usePrefetchData';
import { usePrefetch } from '@/lib/store/apiSlice/hailitApi';

// Mock the usePrefetch hook
jest.mock('@/lib/store/apiSlice/hailitApi', () => ({
  usePrefetch: jest.fn(),
}));

describe('usePrefetchData', () => {
  it('should prefetch data correctly based on page and options', () => {
    // Mock implementation of usePrefetch
    const prefetchMock = jest.fn();
    (usePrefetch as jest.Mock).mockReturnValue(prefetchMock);

    const page = 2;
    const prefetchOption = 'getAllTrips' as const;
    const total_number_of_pages = 5;
    const endpoint = '/trips';

    const { result } = renderHook(() =>
      usePrefetchData({ page, prefetchOption, total_number_of_pages, endpoint })
    );

    // Act to trigger useEffect
    act(() => {
      result.current.handlePrefetchData();
    });

    // Assertions
    expect(prefetchMock).toHaveBeenCalledWith(`${endpoint}&page=1`);
    expect(prefetchMock).toHaveBeenCalledWith(`${endpoint}&page=3`);
    expect(prefetchMock).toHaveBeenCalledWith(`${endpoint}&page=5`); // last page
  });

  it('should prefetch the first 5 pages when on the first page', () => {
    const prefetchMock = jest.fn();
    (usePrefetch as jest.Mock).mockReturnValue(prefetchMock);

    const page = 1;
    const prefetchOption = 'getAllTrips' as const;
    const total_number_of_pages = 5;
    const endpoint = '/trips';

    renderHook(() =>
      usePrefetchData({ page, prefetchOption, total_number_of_pages, endpoint })
    );

    // Assertions for first page
    expect(prefetchMock).toHaveBeenCalledWith(`${endpoint}&page=2`);
    expect(prefetchMock).toHaveBeenCalledWith(`${endpoint}&page=3`);
    expect(prefetchMock).toHaveBeenCalledWith(`${endpoint}&page=4`);
    expect(prefetchMock).toHaveBeenCalledWith(`${endpoint}&page=5`);
    expect(prefetchMock).toHaveBeenCalledWith(`${endpoint}&page=5`); // last page
  });

  it('should prefetch the last 5 pages when on the last page', () => {
    const prefetchMock = jest.fn();
    (usePrefetch as jest.Mock).mockReturnValue(prefetchMock);

    const page = 5;
    const prefetchOption = 'getAllTrips' as const;
    const total_number_of_pages = 5;
    const endpoint = '/trips';

    renderHook(() =>
      usePrefetchData({ page, prefetchOption, total_number_of_pages, endpoint })
    );

    // Assertions for last page
    expect(prefetchMock).toHaveBeenCalledWith(`${endpoint}&page=4`);
    expect(prefetchMock).toHaveBeenCalledWith(`${endpoint}&page=3`);
    expect(prefetchMock).toHaveBeenCalledWith(`${endpoint}&page=2`);
    expect(prefetchMock).toHaveBeenCalledWith(`${endpoint}&page=1`);
    expect(prefetchMock).toHaveBeenCalledWith(`${endpoint}&page=5`); // last page
  });
});
