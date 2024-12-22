import { useState, useCallback } from 'react';
import apiClient from '@/services/api.service';
import { AxiosError, AxiosRequestConfig } from 'axios';

interface UseApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  fetchData: (config: AxiosRequestConfig) => Promise<void>;
}

export function useApi<T>(): UseApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (config: AxiosRequestConfig) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient(config);
      setData(response.data);
    } catch (err) {
      const error = err as AxiosError;
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetchData };
} 