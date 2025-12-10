/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useRef, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { pingVideo, playVideo, stopVideo } from "../utils/services";

interface WatchOptions {
  onExpire?: () => void;
}

export function useWatchSession(
  video_access_id: number,
  options?: WatchOptions
) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startMutation = useMutation({
    mutationFn: () => playVideo({ video_access_id }),
    onSuccess: () => console.log("WATCH: started"),
    onError: () => toast.error("Failed to start watch session"),
  });

  const pingMutation = useMutation({
    mutationFn: () => pingVideo({ video_access_id }),
    onSuccess: (res) => {
      if (res?.message === "Time expired for this video") {
        console.log("WATCH: expired");
        toast.error("Watch time has expired");
        options?.onExpire?.();
        stopWatching(false);
      }
    },
  });

  const stopMutation = useMutation({
    mutationFn: () => stopVideo({ video_access_id }),
    onSuccess: () => console.log("WATCH: stopped"),
  });

  const startWatching = useCallback(() => {
    startMutation.mutate();
    intervalRef.current = setInterval(() => {
      pingMutation.mutate();
    }, 10_000);
  }, []);

  const stopWatching = useCallback((sendApi = true) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (sendApi) stopMutation.mutate();
  }, []);

  const beaconStop = useCallback(() => {
    const payload = JSON.stringify({ video_access_id });
    navigator.sendBeacon(
      `${process.env.NEXT_PUBLIC_API_URL}/watch/end`,
      payload
    );
  }, [video_access_id]);

  useEffect(() => {
    startWatching();
    window.addEventListener("beforeunload", beaconStop);

    return () => {
      window.removeEventListener("beforeunload", beaconStop);
      stopWatching(true);
    };
  }, []);

  return {
    stopWatching,
    startWatching,
  };
}
