import { useGetAllTripsQuery } from '@/lib/store/apiSlice/hailitApi';
import { renderHook } from '@testing-library/react-hooks';
import { TableType, useGetTableData } from './useGetTableData';
import { usePrefetchData } from './usePrefetchData';
import { useSearchAndSortWithEndpoint } from './useSearchAndSortWithEndpoint';

// Mock dependencies
jest.mock('./useSearchAndSortWithEndpoint');
jest.mock('./usePrefetchData');
jest.mock('@/lib/store/apiSlice/hailitApi');

describe('useGetTableData', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with correct data and handle state upBooked Ons', () => {
    // Mock data for query hooks
    (useGetAllTripsQuery as jest.Mock).mockReturnValue({
      data: {
        trips: [{ trip_id: 1, drop_off_location: 'Location Name' }],
        total_number_of_pages: 5,
        total_items: 10
      },
      isLoading: false,
      error: null,
      status: 'fulfilled'
    });

    // Mock implementations for other hooks
    (useSearchAndSortWithEndpoint as jest.Mock).mockReturnValue({
      handleSort: jest.fn(),
      sortDetails: { column: 'Booked On', sortDirection: 'ASC' },
      dataLoading: false,
      handleSearch: jest.fn(),
      searchRef: { current: { value: '' } },
      endpoint: 'trips?',
      setDataLoading: jest.fn(),
      isSearch: false
    });

    (usePrefetchData as jest.Mock).mockReturnValue({
      handlePrefetchData: jest.fn()
    });

    // Render hook
    const { result } = renderHook(() =>
      useGetTableData({
        page: 1,
        table: TableType.TripsTable,
        initialColumn: 'Booked On',
        initialSortDirection: 'ASC'
      })
    );

    // Assertions
    expect(result.current.data).toEqual({"total_items": 10, "total_number_of_pages": 5, "trips": [{"drop_off_location": "Location Name", "trip_id": 1}]});
    expect(result.current.total_number_of_pages).toBe(5);
    expect(result.current.total_items).toBe(10);
    expect(result.current.dataLoading).toBe(false);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.searchRef).toEqual({ current: { value: '' } });
    expect(result.current.sortDetails).toEqual({ column: 'Booked On', sortDirection: 'ASC' });
  });

  it('should call handlePrefetchData on mount', () => {
    const handlePrefetchDataMock = jest.fn();

    (useSearchAndSortWithEndpoint as jest.Mock).mockReturnValue({
      handleSort: jest.fn(),
      sortDetails: { column: 'Booked On', sortDirection: 'ASC' },
      dataLoading: false,
      handleSearch: jest.fn(),
      searchRef: { current: { value: '' } },
      endpoint: 'trips?',
      setDataLoading: jest.fn(),
      isSearch: false
    });

    (usePrefetchData as jest.Mock).mockReturnValue({
      handlePrefetchData: handlePrefetchDataMock
    });

    renderHook(() =>
      useGetTableData({
        page: 1,
        table: TableType.TripsTable,
        initialColumn: 'Booked On',
        initialSortDirection: 'ASC'
      })
    );

    expect(handlePrefetchDataMock).toHaveBeenCalled();
  });

  
});
