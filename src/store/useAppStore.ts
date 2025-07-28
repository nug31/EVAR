import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface EVModel {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  range: number;
  acceleration: number;
  topSpeed: number;
  batteryCapacity: number;
  chargingSpeed: number;
  efficiency: number;
  modelUrl: string;
  image: string;
  colors: string[];
}

export interface ChargingStation {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  distance: number;
  price: number;
  rating: number;
  available: number;
  total: number;
  fastCharge: boolean;
  network: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  favorites: string[];
  arSessions: number;
  modelsViewed: number;
  hoursUsed: number;
}

interface AppState {
  // Tesla Model S data
  teslaModel: EVModel | null;
  selectedColor: string;

  // AR state
  isARSupported: boolean;
  isARActive: boolean;

  // UI state
  isLoading: boolean;
  error: string | null;

  // User interaction
  arSessions: number;
  isFavorite: boolean;

  // Actions
  setTeslaModel: (model: EVModel) => void;
  setSelectedColor: (color: string) => void;
  setARSupported: (supported: boolean) => void;
  setARActive: (active: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  toggleFavorite: () => void;
  incrementARSessions: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      teslaModel: null,
      selectedColor: '#1E40AF',
      isARSupported: false,
      isARActive: false,
      isLoading: false,
      error: null,
      arSessions: 0,
      isFavorite: false,

      // Actions
      setTeslaModel: (teslaModel) => set({ teslaModel }),

      setSelectedColor: (selectedColor) => set({ selectedColor }),

      setARSupported: (isARSupported) => set({ isARSupported }),

      setARActive: (isARActive) => set({ isARActive }),

      setLoading: (isLoading) => set({ isLoading }),

      setError: (error) => set({ error }),

      toggleFavorite: () => {
        const { isFavorite } = get();
        set({ isFavorite: !isFavorite });
      },

      incrementARSessions: () => {
        const { arSessions } = get();
        set({ arSessions: arSessions + 1 });
      }
    }),
    {
      name: 'evar-storage',
      partialize: (state) => ({
        selectedColor: state.selectedColor,
        arSessions: state.arSessions,
        isFavorite: state.isFavorite,
      }),
    }
  )
);
