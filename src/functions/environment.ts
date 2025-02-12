import { MediaQueryOptions } from "../types";

interface MediaQuery {
  isSmallDevice: boolean;
  isMediumDevice: boolean;
  isLargeDevice: boolean;
  isExtraLargeDevice: boolean;
}

export const getMediaQuery = ({
  mobile = "600px",
  tablet = "768px",
  desktop = "992px",
}: MediaQueryOptions = {}): MediaQuery => ({
  isSmallDevice: window.matchMedia(`(max-width: ${mobile})`).matches,
  isMediumDevice: window.matchMedia(`(max-width: ${tablet})`).matches,
  isLargeDevice: window.matchMedia(`(max-width: ${desktop})`).matches,
  isExtraLargeDevice: window.matchMedia(`(min-width: ${desktop})`).matches,
});

export const getWindowSize = (): {
  width: number;
  height: number;
} => {
  if (typeof window !== "undefined") {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  } else {
    throw new Error("Not running in browser environment");
  }
};
