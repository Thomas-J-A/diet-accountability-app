import { renderHook } from '@testing-library/react';
import mediaQuery from 'css-mediaquery';
import useMediaQuery from '../../../src/hooks/useMediaQuery';

// JSDOM doesn't have an implementation of the matchMedia API yet so it must be polyfilled
// https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
const createMatchMedia =
  (width: number) =>
  (query: string): MediaQueryList => ({
    matches: mediaQuery.match(query, { width }),
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  });

describe('useMediaQuery', () => {
  it('should return true when window is larger than query', () => {
    // Polyfill matchMedia API, and make it believe the screen width is 1000px
    window.matchMedia = createMatchMedia(1000);

    // Spy on matchMedia method
    const matchMediaMock = jest.spyOn(window, 'matchMedia');

    // Render hook
    const query = '(min-width: 500px)';
    const { result } = renderHook(() => useMediaQuery(query));

    // Ensure matchMedia method was called with correct argument
    expect(matchMediaMock).toHaveBeenCalledWith(query);

    // Validate that media query matches
    expect(result.current).toBeTruthy();
  });

  it('should return false when window is smaller than query', () => {
    // Imitate a mobile device
    window.matchMedia = createMatchMedia(350);

    const query = '(min-width: 500px)';
    const { result } = renderHook(() => useMediaQuery(query));

    expect(result.current).toBeFalsy();
  });

  // TODO: Implement test case: 'should update value when window resizes'
  // Note: window.innerWidth is not actually taken into account in this test suite; width is faked when
  // polyfilling matchMedia API and simply used to calculate whether the query matches or not
});
