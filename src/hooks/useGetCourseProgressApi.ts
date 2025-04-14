import { useAuth } from "@clerk/nextjs";
import { useCallback, useEffect, useState } from "react";

export const useGetCourseProgressApi = (isTeacher: boolean) => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_END_POINT = process.env.NEXT_PUBLIC_API_BASE_URL || "";

  const { getToken, isLoaded, isSignedIn } = useAuth();

  const getCourseProgressStatus = useCallback(async () => {
    if (isTeacher) {
      return;
    }

    if (!isLoaded || !isSignedIn) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = await getToken();
      const abortController = new AbortController();

      const url = new URL(
        "api/updateuserdata/getCourseProgressInfo",
        API_END_POINT
      ).toString();

      const result = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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
  }, [isLoaded, getToken, API_END_POINT, isSignedIn, isTeacher]);

  useEffect(() => {
    const abortController = new AbortController();

    if (isLoaded && isSignedIn) {
      getCourseProgressStatus();
    }

    // Cleanup function
    return () => {
      abortController.abort();
    };
  }, [getCourseProgressStatus, isLoaded, isSignedIn]);

  if (isTeacher) {
    return {
      data: null,
    };
  } else {
    return {
      data: { data, loading, error, refetch: getCourseProgressStatus },
    };
  }
};
