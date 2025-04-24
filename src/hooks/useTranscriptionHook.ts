import { useAuth } from "@clerk/nextjs";
import { useCallback, useEffect, useState } from "react";

export const useGetTranscriptionSummaryHook = (VideoPublicID: string) => {
  const [data, setData] = useState<any | null | undefined>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_END_POINT = process.env.NEXT_PUBLIC_API_BASE_URL || "";

  const { getToken, isLoaded, isSignedIn } = useAuth();

  const getTranscriptionSummary = useCallback(async () => {
    if (!isLoaded || !isSignedIn) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = await getToken();
      const abortController = new AbortController();

      const url = new URL(
        `api/video/transcript/getTranscriptionSummaryData`,
        API_END_POINT
      ).toString();

      const result = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ VideoPublicID }),
        signal: abortController.signal,
      });

      const finalData = await result.json();

      if (!finalData.status) {
        setError("Failed to Fetch Data");
        return;
      }

      setData(finalData?.data || null);
    } catch (error: any) {
      // Don't set error if the error is due to abort
      if (error.name !== "AbortError") {
        console.error("Error while fetching Course progress Data", error);
        setError(error.message || "An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  }, [isLoaded, getToken, API_END_POINT, isSignedIn, VideoPublicID]);

  useEffect(() => {
    const abortController = new AbortController();

    if (isLoaded && isSignedIn) {
      getTranscriptionSummary();
    }

    return () => {
      abortController.abort();
    };
  }, [isLoaded, isSignedIn, getTranscriptionSummary]);

  return {
    data,
    loading,
    error,
    refetch: getTranscriptionSummary,
  };
};
