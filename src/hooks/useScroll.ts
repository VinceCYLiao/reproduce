import { useCallback, useEffect, useRef, useState } from "react";
import throttle from "lodash.throttle";

const useScroll = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>();

  const scrollCallback = useCallback(() => {
    setIsScrolling(true);
    if (timeoutRef.current !== undefined) clearTimeout(timeoutRef.current);
    if (typeof window !== "undefined") {
      const { pageYOffset } = window;
      setScrollY(pageYOffset);
    }
    timeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 150);
  }, []);

  const scrollEventHandler = throttle(scrollCallback, 100);

  useEffect(() => {
    window.addEventListener("scroll", scrollEventHandler);
    return () => {
      window.removeEventListener("scroll", scrollEventHandler);
    };
  }, [scrollEventHandler]);

  return { scrollY, isScrolling };
};

export default useScroll;
