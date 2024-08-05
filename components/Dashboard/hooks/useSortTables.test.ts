import { renderHook, act } from '@testing-library/react-hooks';
import { useSortTable } from './useSortTables';

describe('useSortTable', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('should initialize with default sort details or saved sort details from localStorage', () => {
    // Set initial sort details in localStorage
    localStorage.setItem('trips', JSON.stringify({
      column: 'date',
      sortDirection: 'ASC'
    }));

    const { result } = renderHook(() =>
      useSortTable({
        table: 'trips',
        initialColumn: 'name',
        initialSortDirection: 'DESC'
      })
    );

    expect(result.current.sortDetails).toEqual({
      column: 'date',
      sortDirection: 'ASC'
    });
  });

  it('should initialize with provided initial column and sort direction if no saved sort details', () => {
    const { result } = renderHook(() =>
      useSortTable({
        table: 'vehicles',
        initialColumn: 'model',
        initialSortDirection: 'DESC'
      })
    );

    expect(result.current.sortDetails).toEqual({
      column: 'model',
      sortDirection: 'DESC'
    });
  });

  it('should update sort details when handleSort is called', () => {
    const { result } = renderHook(() =>
      useSortTable({
        table: 'drivers',
        initialColumn: 'name',
        initialSortDirection: 'ASC'
      })
    );

    // Sort by a column
    act(() => {
      result.current.handleSort('User Role');
    });

    // Check updated sort details
    expect(result.current.sortDetails).toEqual({
      column: 'User Role',
      sortDirection: 'ASC' // Changing from initial 'ASC' to 'DESC'
    });

    // Call handleSort again on the same column to toggle sort direction
    act(() => {
      result.current.handleSort('User Role');
    });

    expect(result.current.sortDetails).toEqual({
      column: 'User Role',
      sortDirection: 'DESC'
    });
  });

  it('should update localStorage when sort details change', () => {
    const { result } = renderHook(() =>
      useSortTable({
        table: 'users',
        initialColumn: 'age',
        initialSortDirection: 'ASC'
      })
    );

    // Mock localStorage setItem
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    act(() => {
      result.current.handleSort('name');
    });

    expect(setItemSpy).toHaveBeenCalledWith('users', JSON.stringify({
      column: 'name',
      sortDirection: 'ASC'
    }));
  });
});
