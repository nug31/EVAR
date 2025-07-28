import React, { useState } from 'react';
import { 
  BarChart3, 
  Car, 
  Battery, 
  Zap, 
  DollarSign,
  Clock,
  Gauge,
  Camera,
  Plus,
  X
} from 'lucide-react';

interface EVModel {
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
  image: string;
}

const Comparison: React.FC = () => {
  const [selectedModels, setSelectedModels] = useState<EVModel[]>([]);
  const [isARMode, setIsARMode] = useState(false);

  const availableModels: EVModel[] = [
    {
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
      image: '/models/tesla-s.jpg'
    },
    {
      id: '2',
      brand: 'Mercedes',
      model: 'EQS',
      year: 2024,
      price: 102310,
      range: 453,
      acceleration: 4.3,
      topSpeed: 155,
      batteryCapacity: 107.8,
      chargingSpeed: 200,
      efficiency: 124,
      image: '/models/mercedes-eqs.jpg'
    },
    {
      id: '3',
      brand: 'BMW',
      model: 'i4 M50',
      year: 2024,
      price: 67300,
      range: 270,
      acceleration: 3.7,
      topSpeed: 140,
      batteryCapacity: 83.9,
      chargingSpeed: 205,
      efficiency: 104,
      image: '/models/bmw-i4.jpg'
    },
    {
      id: '4',
      brand: 'Audi',
      model: 'e-tron GT',
      year: 2024,
      price: 102400,
      range: 238,
      acceleration: 3.9,
      topSpeed: 152,
      batteryCapacity: 93.4,
      chargingSpeed: 270,
      efficiency: 95,
      image: '/models/audi-etron.jpg'
    }
  ];

  const addModel = (model: EVModel) => {
    if (selectedModels.length < 3 && !selectedModels.find(m => m.id === model.id)) {
      setSelectedModels([...selectedModels, model]);
    }
  };

  const removeModel = (modelId: string) => {
    setSelectedModels(selectedModels.filter(m => m.id !== modelId));
  };

  const startARComparison = () => {
    setIsARMode(true);
    alert('AR Comparison mode would start here, showing 3D models side by side');
  };

  const specs = [
    { key: 'price', label: 'Price', icon: DollarSign, unit: '$', format: (val: number) => val.toLocaleString() },
    { key: 'range', label: 'Range', icon: Gauge, unit: ' mi', format: (val: number) => val.toString() },
    { key: 'acceleration', label: '0-60 mph', icon: Clock, unit: 's', format: (val: number) => val.toString() },
    { key: 'topSpeed', label: 'Top Speed', icon: Gauge, unit: ' mph', format: (val: number) => val.toString() },
    { key: 'batteryCapacity', label: 'Battery', icon: Battery, unit: ' kWh', format: (val: number) => val.toString() },
    { key: 'chargingSpeed', label: 'Fast Charge', icon: Zap, unit: ' kW', format: (val: number) => val.toString() },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
            EV <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Comparison</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Compare electric vehicles side-by-side with detailed specifications and AR visualization.
          </p>
        </div>

        {/* Model Selection */}
        {selectedModels.length < 3 && (
          <div className="mb-8">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Add Models to Compare</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {availableModels
                  .filter(model => !selectedModels.find(m => m.id === model.id))
                  .map((model) => (
                    <button
                      key={model.id}
                      onClick={() => addModel(model)}
                      className="p-4 bg-slate-700/50 rounded-lg border border-slate-600/50 hover:bg-slate-700 hover:border-purple-500/50 transition-all duration-200 text-left group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-white">{model.brand}</h3>
                          <p className="text-sm text-slate-400">{model.model}</p>
                        </div>
                        <Plus className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-colors" />
                      </div>
                      <p className="text-sm text-slate-300">${model.price.toLocaleString()}</p>
                    </button>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Comparison Table */}
        {selectedModels.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-white">
                Comparing {selectedModels.length} Model{selectedModels.length > 1 ? 's' : ''}
              </h2>
              {selectedModels.length > 1 && (
                <button
                  onClick={startARComparison}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  View in AR
                </button>
              )}
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden">
              {/* Model Headers */}
              <div className="grid" style={{ gridTemplateColumns: `200px repeat(${selectedModels.length}, 1fr)` }}>
                <div className="p-6 border-r border-slate-700/50">
                  <h3 className="text-lg font-bold text-white">Specifications</h3>
                </div>
                {selectedModels.map((model) => (
                  <div key={model.id} className="p-6 border-r border-slate-700/50 last:border-r-0 relative">
                    <button
                      onClick={() => removeModel(model.id)}
                      className="absolute top-4 right-4 w-6 h-6 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center hover:bg-red-500/30 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl mx-auto mb-4 flex items-center justify-center">
                        <Car className="w-8 h-8 text-purple-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white">{model.brand}</h3>
                      <p className="text-slate-300 mb-2">{model.model}</p>
                      <p className="text-sm text-slate-400">{model.year}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Specifications */}
              {specs.map((spec, index) => {
                const IconComponent = spec.icon;
                return (
                  <div
                    key={spec.key}
                    className={`grid border-t border-slate-700/50 ${index % 2 === 0 ? 'bg-slate-700/20' : ''}`}
                    style={{ gridTemplateColumns: `200px repeat(${selectedModels.length}, 1fr)` }}
                  >
                    <div className="p-4 border-r border-slate-700/50">
                      <div className="flex items-center">
                        <IconComponent className="w-5 h-5 text-purple-400 mr-2" />
                        <span className="font-medium text-white">{spec.label}</span>
                      </div>
                    </div>
                    {selectedModels.map((model) => {
                      const value = model[spec.key as keyof EVModel] as number;
                      const isHighest = selectedModels.length > 1 && 
                        Math.max(...selectedModels.map(m => m[spec.key as keyof EVModel] as number)) === value;
                      const isLowest = selectedModels.length > 1 &&
                        Math.min(...selectedModels.map(m => m[spec.key as keyof EVModel] as number)) === value;
                      
                      return (
                        <div
                          key={`${model.id}-${spec.key}`}
                          className={`p-4 border-r border-slate-700/50 last:border-r-0 text-center ${
                            spec.key === 'price' 
                              ? (isLowest ? 'bg-green-500/20 text-green-300' : isHighest ? 'bg-red-500/20 text-red-300' : 'text-white')
                              : (isHighest ? 'bg-green-500/20 text-green-300' : isLowest ? 'bg-red-500/20 text-red-300' : 'text-white')
                          }`}
                        >
                          <span className="text-lg font-semibold">
                            {spec.unit.startsWith('$') ? spec.unit : ''}
                            {spec.format(value)}
                            {!spec.unit.startsWith('$') ? spec.unit : ''}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            {/* Winner Summary */}
            {selectedModels.length > 1 && (
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-6 text-center">
                  <div className="text-2xl font-bold text-green-300 mb-2">Best Value</div>
                  <div className="text-white font-semibold">
                    {availableModels.find(m => 
                      m.id === selectedModels.reduce((best, current) => 
                        (current.range / current.price * 1000) > (best.range / best.price * 1000) ? current : best
                      ).id
                    )?.brand} {availableModels.find(m => 
                      m.id === selectedModels.reduce((best, current) => 
                        (current.range / current.price * 1000) > (best.range / best.price * 1000) ? current : best
                      ).id
                    )?.model}
                  </div>
                </div>

                <div className="bg-purple-500/20 border border-purple-500/50 rounded-xl p-6 text-center">
                  <div className="text-2xl font-bold text-purple-300 mb-2">Longest Range</div>
                  <div className="text-white font-semibold">
                    {selectedModels.reduce((best, current) => current.range > best.range ? current : best).brand} {' '}
                    {selectedModels.reduce((best, current) => current.range > best.range ? current : best).model}
                  </div>
                </div>

                <div className="bg-cyan-500/20 border border-cyan-500/50 rounded-xl p-6 text-center">
                  <div className="text-2xl font-bold text-cyan-300 mb-2">Fastest</div>
                  <div className="text-white font-semibold">
                    {selectedModels.reduce((best, current) => current.acceleration < best.acceleration ? current : best).brand} {' '}
                    {selectedModels.reduce((best, current) => current.acceleration < best.acceleration ? current : best).model}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {selectedModels.length === 0 && (
          <div className="text-center py-16">
            <BarChart3 className="w-24 h-24 text-slate-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">Start Comparing EVs</h2>
            <p className="text-slate-300 max-w-md mx-auto">
              Select electric vehicle models from above to compare their specifications, performance, and features side-by-side.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comparison;