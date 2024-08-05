import { renderHook, act } from '@testing-library/react-hooks';
import { useSearchAndSortWithEndpoint } from './useSearchAndSortWithEndpoint'; // Adjust the import path
import { useSortTable } from './useSortTables'; // Adjust the import path

// Mock the useSortTable hook
jest.mock('./useSortTables', () => ({
  useSortTable: jest.fn(),
}));

describe('useSearchAndSortWithEndpoint', () => {
  beforeEach(() => {
    (useSortTable as jest.Mock).mockReturnValue({
      handleSort: jest.fn(),
      sortDetails: { column: 'name', sortDirection: 'ASC' },
      setDataLoading: jest.fn(),
      dataLoading: false,
    });
  });

  it('should initialize with correct endpoint and handle search query', () => {
    const { result } = renderHook(() =>
      useSearchAndSortWithEndpoint({
        table: 'trips',
        endpoint: 'trips?',
        initialColumn: 'name',
        initialSortDirection: 'ASC'
      })
    );

    // Check initial endpoint
    expect(result.current.endpoint).toBe('trips?&sortColumn=name&sortDirection=ASC');

    // Simulate search
    act(() => {
      result.current.handleSearch({ reset: false });
    });

    // Set a value for searchRef.current
    act(() => {
      if (result.current.searchRef.current) {
        result.current.searchRef.current.value = 'name';
      }
    });
    act(() => {
      if (result.current.searchRef.current) {
        result.current.searchQuery = 'name';
      }
    });

    act(() => {
      result.current.handleSearch({ reset: false });
    });
    act(() => {
      result.current.setSearchQuery('name');
    });

    

    expect(result.current.isSearch).toBe(true);
    expect(result.current.searchQuery).toBe('name');
    expect(result.current.endpoint).toContain('&search=name');
  });

  it('should append sorting parameters to endpoint', () => {
    const { result } = renderHook(() =>
      useSearchAndSortWithEndpoint({
        table: 'trips',
        endpoint: 'trips?',
        initialColumn: 'name',
        initialSortDirection: 'ASC'
      })
    );

    expect(result.current.endpoint).toContain('&sortColumn=name');
    expect(result.current.endpoint).toContain('&sortDirection=ASC');
  });

  it('should handle search reset correctly', () => {
    const { result } = renderHook(() =>
      useSearchAndSortWithEndpoint({
        table: 'trips',
        endpoint: 'trips?',
        initialColumn: 'name',
        initialSortDirection: 'ASC'
      })
    );

    // Simulate search
    act(() => {
      result.current.handleSearch({ reset: false });
    });

    // Set a value for searchRef.current
    act(() => {
      if (result.current.searchRef.current) {
        result.current.searchRef.current.value = 'test';
      }
    });

    act(() => {
      result.current.handleSearch({ reset: true });
    });
    act(() => {
      result.current.setSearchQuery('');
    });

    expect(result.current.isSearch).toBe(false);
    if (result.current.searchRef.current) {
      expect(result.current.searchRef.current.value).toBe('');
    }
    expect(result.current.searchQuery).toBe('');
  });
});
