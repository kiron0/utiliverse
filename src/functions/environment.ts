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
}: MediaQueryOptions = {}): MediaQuery => {
  if (typeof window !== "undefined") {
    return {
      isSmallDevice: window.matchMedia(`(max-width: ${mobile})`).matches,
      isMediumDevice: window.matchMedia(`(max-width: ${tablet})`).matches,
      isLargeDevice: window.matchMedia(`(max-width: ${desktop})`).matches,
      isExtraLargeDevice: window.matchMedia(`(min-width: ${desktop})`).matches,
    };
  } else {
    throw new Error("You can't use this function on the server side");
  }
};

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
    throw new Error("You can't use this function on the server side");
  }
};

export const scrollToTop = (): void => {
  if (typeof window !== "undefined") {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  } else {
    throw new Error("You can't use this function on the server side");
  }
};
