import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { api, locationUtils } from '../services/api';
import { useAppStore } from '../store/useAppStore';

export const useChargingStations = () => {
  const { setChargingStations, setLoading, setError } = useAppStore();

  const {
    data: stations,
    isLoading,
    error,
    refetch
  } = useQuery(
    'chargingStations',
    api.getChargingStations,
    {
      staleTime: 2 * 60 * 1000, // 2 minutes (more frequent updates for real-time data)
      cacheTime: 5 * 60 * 1000, // 5 minutes
      retry: 3,
      onSuccess: (data) => {
        setChargingStations(data);
        setError(null);
      },
      onError: (err: any) => {
        setError(err.message || 'Failed to load charging stations');
      }
    }
  );

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  return {
    stations,
    isLoading,
    error,
    refetch
  };
};

export const useNearbyStations = () => {
  const { data: location } = useQuery(
    'userLocation',
    locationUtils.getCurrentPosition,
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000,
      retry: 1
    }
  );

  const { data: stations } = useQuery(
    ['nearbyStations', location?.latitude, location?.longitude],
    () => api.getChargingStations(location?.latitude, location?.longitude, 25),
    {
      enabled: !!location,
      staleTime: 2 * 60 * 1000,
      cacheTime: 5 * 60 * 1000
    }
  );

  return {
    stations: stations || [],
    location,
    hasLocation: !!location
  };
};
