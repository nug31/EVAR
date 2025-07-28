import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { api } from '../services/api';
import { useAppStore } from '../store/useAppStore';

export const useTeslaModel = () => {
  const { setTeslaModel, setLoading, setError } = useAppStore();

  const {
    data: teslaModel,
    isLoading,
    error,
    refetch
  } = useQuery(
    'teslaModelS',
    api.getTeslaModelS,
    {
      staleTime: 10 * 60 * 1000, // 10 minutes
      cacheTime: 30 * 60 * 1000, // 30 minutes
      retry: 2,
      onSuccess: (data) => {
        setTeslaModel(data);
        setError(null);
      },
      onError: (err: any) => {
        setError(err.message || 'Failed to load Tesla Model S');
      }
    }
  );

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  return {
    teslaModel,
    isLoading,
    error,
    refetch
  };
};
