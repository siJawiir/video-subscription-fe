// hooks/useScreenResolutionListener.ts
import { useEffect } from "react";
import { useScreenResolutionStore } from "../store/screenResolutionStore";

export function useScreenResolutionListener() {
  const setSize = useScreenResolutionStore((state) => state.setSize);

  useEffect(() => {
    const handleResize = () => {
      setSize(window.innerWidth, window.innerHeight);
    };

    // set ukuran awal
    handleResize();

    // tambahkan listener resize
    window.addEventListener("resize", handleResize);

    // cleanup saat komponen unmount
    return () => window.removeEventListener("resize", handleResize);
  }, [setSize]);
}
