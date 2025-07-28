import { EVModel, ChargingStation, UserProfile } from '../store/useAppStore';

// Single Tesla Model S - Simplified data
const teslaModelS: EVModel = {
  id: '1',
  brand: 'Tesla',
  model: 'Model S',
  year: 2024,
  price: 89990,
  range: 405,
  acceleration: 3.1,
  topSpeed: 200,
  batteryCapacity: 100,
  chargingSpeed: 250,
  efficiency: 120,
  modelUrl: '/models/tesla-s.glb',
  image: '/models/tesla-s.jpg',
  colors: ['#1E40AF', '#F8FAFC', '#0F172A', '#DC2626', '#059669']
};

const mockChargingStations: ChargingStation[] = [
  {
    id: '1',
    name: 'Tesla Supercharger',
    address: '123 Electric Ave, Tech City',
    latitude: 37.7749,
    longitude: -122.4194,
    distance: 0.8,
    price: 0.28,
    rating: 4.8,
    available: 6,
    total: 8,
    fastCharge: true,
    network: 'Tesla'
  },
  {
    id: '2',
    name: 'ChargePoint Station',
    address: '456 Green St, EcoTown',
    latitude: 37.7849,
    longitude: -122.4094,
    distance: 1.2,
    price: 0.35,
    rating: 4.5,
    available: 2,
    total: 4,
    fastCharge: false,
    network: 'ChargePoint'
  },
  {
    id: '3',
    name: 'Electrify America',
    address: '789 Power Blvd, Energy City',
    latitude: 37.7649,
    longitude: -122.4294,
    distance: 2.1,
    price: 0.31,
    rating: 4.3,
    available: 4,
    total: 6,
    fastCharge: true,
    network: 'Electrify America'
  },
  {
    id: '4',
    name: 'EVgo Fast Charging',
    address: '321 Volt Way, Current Town',
    latitude: 37.7549,
    longitude: -122.4394,
    distance: 2.8,
    price: 0.33,
    rating: 4.1,
    available: 0,
    total: 3,
    fastCharge: true,
    network: 'EVgo'
  }
];

const mockUser: UserProfile = {
  id: '1',
  name: 'John Tesla',
  email: 'john@example.com',
  avatar: '/avatars/john.jpg',
  favorites: ['1', '3'],
  arSessions: 142,
  modelsViewed: 28,
  hoursUsed: 36
};

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Single Tesla Model S
  async getTeslaModelS(): Promise<EVModel> {
    await delay(800);
    return teslaModelS;
  },

  async getEVModel(): Promise<EVModel> {
    await delay(500);
    return teslaModelS;
  },

  // Charging Stations
  async getChargingStations(latitude?: number, longitude?: number, radius?: number): Promise<ChargingStation[]> {
    await delay(1200);
    // In real implementation, would filter by location
    return mockChargingStations;
  },

  async getChargingStation(id: string): Promise<ChargingStation | null> {
    await delay(500);
    return mockChargingStations.find(station => station.id === id) || null;
  },

  // User
  async getUser(): Promise<UserProfile> {
    await delay(800);
    return mockUser;
  },

  async updateUser(user: Partial<UserProfile>): Promise<UserProfile> {
    await delay(600);
    return { ...mockUser, ...user };
  },

  // Favorites
  async addToFavorites(userId: string, modelId: string): Promise<void> {
    await delay(400);
    // In real implementation, would make API call
  },

  async removeFromFavorites(userId: string, modelId: string): Promise<void> {
    await delay(400);
    // In real implementation, would make API call
  },

  // AR Sessions
  async recordARSession(userId: string, modelId: string, duration: number): Promise<void> {
    await delay(300);
    // In real implementation, would record analytics
  }
};

// WebXR utilities
export const webXRUtils = {
  async checkARSupport(): Promise<boolean> {
    if (!navigator.xr) {
      return false;
    }
    
    try {
      const isSupported = await navigator.xr.isSessionSupported('immersive-ar');
      return isSupported;
    } catch (error) {
      console.warn('WebXR AR not supported:', error);
      return false;
    }
  },

  async requestARSession(): Promise<XRSession | null> {
    if (!navigator.xr) {
      throw new Error('WebXR not supported');
    }

    try {
      const session = await navigator.xr.requestSession('immersive-ar', {
        requiredFeatures: ['local', 'hit-test'],
        optionalFeatures: ['dom-overlay'],
      });
      return session;
    } catch (error) {
      console.error('Failed to start AR session:', error);
      return null;
    }
  }
};

// Geolocation utilities
export const locationUtils = {
  async getCurrentPosition(): Promise<{ latitude: number; longitude: number } | null> {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve(null);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.warn('Geolocation error:', error);
          resolve(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    });
  },

  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 3959; // Earth's radius in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }
};
