import { useEffect } from "react";
import { useScreenResolutionStore } from "../store/screenResolutionStore";

export function useScreenResolutionListener() {
  const setSize = useScreenResolutionStore((state) => state.setSize);

  useEffect(() => {
    const handleResize = () => {
      setSize(window.innerWidth, window.innerHeight);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [setSize]);
}
