import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Navigation, 
  Zap, 
  Clock, 
  DollarSign,
  Star,
  Filter,
  Camera,
  Navigation2
} from 'lucide-react';

interface ChargingStation {
  id: string;
  name: string;
  address: string;
  distance: number;
  price: number;
  rating: number;
  available: number;
  total: number;
  fastCharge: boolean;
  network: string;
}

const ChargingStations: React.FC = () => {
  const [stations, setStations] = useState<ChargingStation[]>([]);
  const [searchRadius, setSearchRadius] = useState(10);
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);
  const [selectedStation, setSelectedStation] = useState<ChargingStation | null>(null);

  useEffect(() => {
    // Mock data - in real app, this would fetch from API
    const mockStations: ChargingStation[] = [
      {
        id: '1',
        name: 'Tesla Supercharger',
        address: '123 Electric Ave, Tech City',
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
        distance: 2.8,
        price: 0.33,
        rating: 4.1,
        available: 0,
        total: 3,
        fastCharge: true,
        network: 'EVgo'
      }
    ];

    setStations(mockStations);
  }, []);

  const filteredStations = stations.filter(station => {
    if (showOnlyAvailable && station.available === 0) return false;
    return station.distance <= searchRadius;
  });

  const startARNavigation = (station: ChargingStation) => {
    setSelectedStation(station);
    // In a real implementation, this would initialize AR navigation
    alert(`AR Navigation to ${station.name} would start here`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
            Charging <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Stations</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Find nearby charging stations with real-time availability and AR-guided navigation.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Map/AR View Placeholder */}
          <div className="lg:col-span-7">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden">
              <div className="p-6 border-b border-slate-700/50">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">Map View</h2>
                  <button 
                    onClick={() => alert('AR Map View would launch here')}
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-medium rounded-lg hover:from-emerald-600 hover:to-cyan-600 transition-all duration-200"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    AR View
                  </button>
                </div>
              </div>

              {/* Mock Map */}
              <div className="h-96 lg:h-[500px] bg-gradient-to-br from-emerald-600/20 to-cyan-600/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-slate-700/50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Interactive Map</h3>
                    <p className="text-slate-300">Real map integration with charging station locations</p>
                  </div>
                </div>

                {/* Mock Station Markers */}
                {filteredStations.map((station, index) => (
                  <button
                    key={station.id}
                    onClick={() => setSelectedStation(station)}
                    className={`absolute w-8 h-8 rounded-full border-2 border-white shadow-lg transition-transform hover:scale-110 ${
                      station.available > 0 ? 'bg-emerald-500' : 'bg-red-500'
                    }`}
                    style={{
                      left: `${20 + index * 15}%`,
                      top: `${30 + index * 10}%`
                    }}
                  >
                    <Zap className="w-4 h-4 text-white mx-auto" />
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Station Details */}
            {selectedStation && (
              <div className="mt-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{selectedStation.name}</h3>
                    <p className="text-slate-300">{selectedStation.address}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => startARNavigation(selectedStation)}
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
                    >
                      <Navigation2 className="w-4 h-4 mr-2" />
                      AR Navigate
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                    <Navigation className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                    <div className="text-lg font-bold text-white">{selectedStation.distance} mi</div>
                    <div className="text-sm text-slate-400">Distance</div>
                  </div>
                  <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                    <Zap className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                    <div className="text-lg font-bold text-white">{selectedStation.available}/{selectedStation.total}</div>
                    <div className="text-sm text-slate-400">Available</div>
                  </div>
                  <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                    <DollarSign className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                    <div className="text-lg font-bold text-white">${selectedStation.price}/kWh</div>
                    <div className="text-sm text-slate-400">Price</div>
                  </div>
                  <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                    <Star className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                    <div className="text-lg font-bold text-white">{selectedStation.rating}</div>
                    <div className="text-sm text-slate-400">Rating</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Controls and Station List */}
          <div className="lg:col-span-5 space-y-6">
            {/* Filters */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Filter className="w-5 h-5 mr-2 text-cyan-400" />
                Filters
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Search Radius: {searchRadius} miles
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="25"
                    value={searchRadius}
                    onChange={(e) => setSearchRadius(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="available"
                    checked={showOnlyAvailable}
                    onChange={(e) => setShowOnlyAvailable(e.target.checked)}
                    className="w-4 h-4 text-cyan-600 bg-slate-700 border-slate-600 rounded focus:ring-cyan-500"
                  />
                  <label htmlFor="available" className="ml-2 text-sm font-medium text-slate-300">
                    Show only available stations
                  </label>
                </div>
              </div>
            </div>

            {/* Station List */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
              <h3 className="text-xl font-bold text-white mb-4">
                Nearby Stations ({filteredStations.length})
              </h3>
              
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {filteredStations.map((station) => (
                  <div
                    key={station.id}
                    onClick={() => setSelectedStation(station)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                      selectedStation?.id === station.id
                        ? 'bg-cyan-500/20 border-cyan-500/50'
                        : 'bg-slate-700/50 border-slate-600/50 hover:bg-slate-700 hover:border-slate-500'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-white">{station.name}</h4>
                        <p className="text-sm text-slate-400">{station.network}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-slate-300">{station.distance} mi</div>
                        <div className="flex items-center">
                          <Star className="w-3 h-3 text-yellow-400 mr-1" />
                          <span className="text-sm text-slate-400">{station.rating}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`flex items-center text-sm ${
                          station.available > 0 ? 'text-emerald-400' : 'text-red-400'
                        }`}>
                          <Zap className="w-4 h-4 mr-1" />
                          {station.available}/{station.total}
                        </div>
                        <div className="flex items-center text-sm text-slate-400">
                          <DollarSign className="w-4 h-4 mr-1" />
                          ${station.price}/kWh
                        </div>
                      </div>
                      {station.fastCharge && (
                        <div className="bg-purple-500/20 text-purple-400 text-xs px-2 py-1 rounded-full">
                          Fast Charge
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChargingStations;