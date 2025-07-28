import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft,
  Battery,
  Gauge,
  Timer,
  Zap,
  Car,
  Camera,
  Heart,
  Star
} from 'lucide-react';
import { useTeslaModel } from '../hooks/useEVModels';
import { useAppStore } from '../store/useAppStore';

const Specs: React.FC = () => {
  const { teslaModel, isLoading } = useTeslaModel();
  const { selectedColor, isFavorite, toggleFavorite } = useAppStore();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Car className="w-16 h-16 text-cyan-400 animate-pulse mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Loading Specifications</h2>
          <p className="text-slate-300">Please wait...</p>
        </div>
      </div>
    );
  }

  if (!teslaModel) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Car className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Model Not Found</h2>
          <Link to="/" className="text-cyan-400 hover:text-cyan-300">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const specifications = [
    {
      category: "Performance",
      specs: [
        { label: "Range (EPA)", value: `${teslaModel.range} mi`, icon: Gauge },
        { label: "Acceleration (0-60 mph)", value: `${teslaModel.acceleration} sec`, icon: Timer },
        { label: "Top Speed", value: `${teslaModel.topSpeed} mph`, icon: Car },
        { label: "Efficiency", value: `${teslaModel.efficiency} MPGe`, icon: Star }
      ]
    },
    {
      category: "Battery & Charging",
      specs: [
        { label: "Battery Capacity", value: `${teslaModel.batteryCapacity} kWh`, icon: Battery },
        { label: "Charging Speed (Max)", value: `${teslaModel.chargingSpeed} kW`, icon: Zap },
        { label: "Charging Time (10-80%)", value: "25 min", icon: Timer },
        { label: "Home Charging", value: "11 kW AC", icon: Zap }
      ]
    },
    {
      category: "General",
      specs: [
        { label: "Model Year", value: teslaModel.year.toString(), icon: Car },
        { label: "Starting Price", value: `$${teslaModel.price.toLocaleString()}`, icon: Star },
        { label: "Drivetrain", value: "Dual Motor AWD", icon: Car },
        { label: "Seating", value: "5 Adults", icon: Car }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link
              to="/"
              className="inline-flex items-center text-slate-300 hover:text-white transition-colors mr-6"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-3xl lg:text-4xl font-bold text-white">
              {teslaModel.brand} {teslaModel.model} Specifications
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleFavorite}
              className={`p-3 rounded-lg transition-colors ${
                isFavorite 
                  ? 'bg-pink-500 text-white' 
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
            
            <Link
              to="/showroom"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-emerald-600 transition-all duration-200"
            >
              <Camera className="w-5 h-5 mr-2" />
              View in AR
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Specifications */}
          <div className="lg:col-span-2 space-y-8">
            {specifications.map((section, index) => (
              <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                <h2 className="text-2xl font-bold text-white mb-6">{section.category}</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {section.specs.map((spec, specIndex) => (
                    <div key={specIndex} className="bg-slate-700/50 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <spec.icon className="w-5 h-5 text-cyan-400 mr-2" />
                        <span className="text-slate-300 text-sm">{spec.label}</span>
                      </div>
                      <span className="text-xl font-bold text-white">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Model Preview */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              <h3 className="text-xl font-bold text-white mb-4">Model Preview</h3>
              <div className="aspect-square bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl flex items-center justify-center mb-4">
                <div className="text-center">
                  <Car className="w-16 h-16 text-slate-500 mx-auto mb-2" />
                  <p className="text-slate-400 text-sm">3D Model</p>
                  <p className="text-xs text-slate-500">Available in AR</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Current Color</span>
                  <div 
                    className="w-6 h-6 rounded-full border-2 border-slate-600"
                    style={{ backgroundColor: selectedColor }}
                  ></div>
                </div>
                
                <Link
                  to="/showroom"
                  className="w-full inline-flex items-center justify-center px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Customize in AR
                </Link>
              </div>
            </div>

            {/* Quick Facts */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              <h3 className="text-xl font-bold text-white mb-4">Quick Facts</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Model Year</span>
                  <span className="text-white font-semibold">{teslaModel.year}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Brand</span>
                  <span className="text-white font-semibold">{teslaModel.brand}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Type</span>
                  <span className="text-white font-semibold">Electric Sedan</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Drivetrain</span>
                  <span className="text-white font-semibold">AWD</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Autopilot</span>
                  <span className="text-white font-semibold">Standard</span>
                </div>
              </div>
            </div>

            {/* AR Features */}
            <div className="bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 rounded-2xl p-6 border border-cyan-500/30">
              <h3 className="text-xl font-bold text-white mb-4">AR Features</h3>
              <div className="space-y-3">
                <div className="flex items-center text-slate-300">
                  <Camera className="w-4 h-4 mr-2 text-cyan-400" />
                  360° Model Viewing
                </div>
                <div className="flex items-center text-slate-300">
                  <Star className="w-4 h-4 mr-2 text-cyan-400" />
                  Color Customization
                </div>
                <div className="flex items-center text-slate-300">
                  <Zap className="w-4 h-4 mr-2 text-cyan-400" />
                  Interactive Features
                </div>
                <div className="flex items-center text-slate-300">
                  <Car className="w-4 h-4 mr-2 text-cyan-400" />
                  Real-time Rendering
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Specs;
