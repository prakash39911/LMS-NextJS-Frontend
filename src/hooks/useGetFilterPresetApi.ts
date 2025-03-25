import { useAuth } from "@clerk/nextjs";
import { useCallback, useEffect, useState } from "react";

export const useGetFilterPresetApi = () => {
  const [data, setData] = useState<null | any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_END_POINT = process.env.NEXT_PUBLIC_API_BASE_URL;

  const { getToken } = useAuth();

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const token = await getToken();

      const result = await fetch(
        `${API_END_POINT}api/advancedFilter/getFilterPresetForUser`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!result.ok) {
        throw new Error(`Error while fetching Data`);
      }

      const finalData = await result.json();
      const final = finalData?.data;
      setData(final);
    } catch (error: any) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [getToken, API_END_POINT]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};
