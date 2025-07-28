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
  // User data
  user: UserProfile | null;
  
  // EV Models
  evModels: EVModel[];
  selectedModel: EVModel | null;
  selectedColor: string;
  
  // Charging stations
  chargingStations: ChargingStation[];
  selectedStation: ChargingStation | null;
  
  // AR state
  isARSupported: boolean;
  isARActive: boolean;
  
  // UI state
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setUser: (user: UserProfile) => void;
  setEVModels: (models: EVModel[]) => void;
  setSelectedModel: (model: EVModel | null) => void;
  setSelectedColor: (color: string) => void;
  setChargingStations: (stations: ChargingStation[]) => void;
  setSelectedStation: (station: ChargingStation | null) => void;
  setARSupported: (supported: boolean) => void;
  setARActive: (active: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  addToFavorites: (modelId: string) => void;
  removeFromFavorites: (modelId: string) => void;
  incrementARSessions: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      evModels: [],
      selectedModel: null,
      selectedColor: '#1E40AF',
      chargingStations: [],
      selectedStation: null,
      isARSupported: false,
      isARActive: false,
      isLoading: false,
      error: null,

      // Actions
      setUser: (user) => set({ user }),
      
      setEVModels: (evModels) => set({ evModels }),
      
      setSelectedModel: (selectedModel) => set({ selectedModel }),
      
      setSelectedColor: (selectedColor) => set({ selectedColor }),
      
      setChargingStations: (chargingStations) => set({ chargingStations }),
      
      setSelectedStation: (selectedStation) => set({ selectedStation }),
      
      setARSupported: (isARSupported) => set({ isARSupported }),
      
      setARActive: (isARActive) => set({ isARActive }),
      
      setLoading: (isLoading) => set({ isLoading }),
      
      setError: (error) => set({ error }),
      
      addToFavorites: (modelId) => {
        const { user } = get();
        if (user) {
          const updatedUser = {
            ...user,
            favorites: [...user.favorites, modelId]
          };
          set({ user: updatedUser });
        }
      },
      
      removeFromFavorites: (modelId) => {
        const { user } = get();
        if (user) {
          const updatedUser = {
            ...user,
            favorites: user.favorites.filter(id => id !== modelId)
          };
          set({ user: updatedUser });
        }
      },
      
      incrementARSessions: () => {
        const { user } = get();
        if (user) {
          const updatedUser = {
            ...user,
            arSessions: user.arSessions + 1
          };
          set({ user: updatedUser });
        }
      }
    }),
    {
      name: 'evar-storage',
      partialize: (state) => ({
        user: state.user,
        selectedColor: state.selectedColor,
      }),
    }
  )
);
