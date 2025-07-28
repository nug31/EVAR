import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { api } from '../services/api';
import { useAppStore } from '../store/useAppStore';

export const useEVModels = () => {
  const { setEVModels, setLoading, setError } = useAppStore();

  const {
    data: models,
    isLoading,
    error,
    refetch
  } = useQuery(
    'evModels',
    api.getEVModels,
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 3,
      onSuccess: (data) => {
        setEVModels(data);
        setError(null);
      },
      onError: (err: any) => {
        setError(err.message || 'Failed to load EV models');
      }
    }
  );

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  return {
    models,
    isLoading,
    error,
    refetch
  };
};

export const useEVModel = (id: string) => {
  return useQuery(
    ['evModel', id],
    () => api.getEVModel(id),
    {
      enabled: !!id,
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000
    }
  );
};
