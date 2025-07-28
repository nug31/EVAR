import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Camera, 
  Car, 
  Battery, 
  ArrowRight,
  Zap,
  Gauge,
  Timer,
  Star,
  Heart
} from 'lucide-react';
import { useTeslaModel } from '../hooks/useEVModels';
import { useAppStore } from '../store/useAppStore';

const SimpleHome: React.FC = () => {
  const { teslaModel, isLoading } = useTeslaModel();
  const { arSessions, isFavorite, toggleFavorite } = useAppStore();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Car className="w-16 h-16 text-cyan-400 animate-pulse mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Loading Tesla Model S</h2>
          <p className="text-slate-300">Preparing your AR experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">
              Tesla Model S
              <span className="block bg-gradient-to-r from-cyan-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent">
                in Augmented Reality
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Experience the future of electric vehicles. Explore, customize, and interact with the Tesla Model S in stunning AR.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/showroom"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-emerald-600 transition-all duration-200 transform hover:scale-105"
              >
                <Camera className="w-5 h-5 mr-2" />
                Launch AR Experience
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                to="/specs"
                className="inline-flex items-center px-8 py-4 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-all duration-200"
              >
                <Car className="w-5 h-5 mr-2" />
                View Specifications
              </Link>
            </div>
          </div>

          {/* Tesla Model S Card */}
          {teslaModel && (
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-3xl font-bold text-white">
                      {teslaModel.brand} {teslaModel.model}
                    </h2>
                    <button
                      onClick={toggleFavorite}
                      className={`p-2 rounded-lg transition-colors ${
                        isFavorite 
                          ? 'bg-pink-500 text-white' 
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                  
                  <p className="text-slate-300 mb-6">
                    The pinnacle of electric luxury and performance. Experience zero-emission driving without compromise.
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-slate-700/50 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <Gauge className="w-5 h-5 text-cyan-400 mr-2" />
                        <span className="text-slate-300 text-sm">Range</span>
                      </div>
                      <span className="text-2xl font-bold text-white">{teslaModel.range}</span>
                      <span className="text-slate-400 ml-1">mi</span>
                    </div>
                    
                    <div className="bg-slate-700/50 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <Timer className="w-5 h-5 text-emerald-400 mr-2" />
                        <span className="text-slate-300 text-sm">0-60 mph</span>
                      </div>
                      <span className="text-2xl font-bold text-white">{teslaModel.acceleration}</span>
                      <span className="text-slate-400 ml-1">s</span>
                    </div>
                    
                    <div className="bg-slate-700/50 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <Battery className="w-5 h-5 text-yellow-400 mr-2" />
                        <span className="text-slate-300 text-sm">Battery</span>
                      </div>
                      <span className="text-2xl font-bold text-white">{teslaModel.batteryCapacity}</span>
                      <span className="text-slate-400 ml-1">kWh</span>
                    </div>
                    
                    <div className="bg-slate-700/50 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <Zap className="w-5 h-5 text-blue-400 mr-2" />
                        <span className="text-slate-300 text-sm">Charging</span>
                      </div>
                      <span className="text-2xl font-bold text-white">{teslaModel.chargingSpeed}</span>
                      <span className="text-slate-400 ml-1">kW</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-3xl font-bold text-white">
                        ${teslaModel.price.toLocaleString()}
                      </span>
                      <span className="text-slate-400 ml-2">Starting price</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-slate-400">AR Sessions</div>
                      <div className="text-xl font-bold text-cyan-400">{arSessions}</div>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="aspect-video bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <Car className="w-24 h-24 text-slate-500 mx-auto mb-4" />
                      <p className="text-slate-400">3D Model Preview</p>
                      <p className="text-sm text-slate-500">Available in AR Showroom</p>
                    </div>
                  </div>
                  
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                    AR Ready
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-cyan-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/3 right-10 w-32 h-32 bg-emerald-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/4 w-16 h-16 bg-blue-500/20 rounded-full blur-xl animate-pulse delay-500"></div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-cyan-400" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">4.9</div>
              <div className="text-slate-400 text-sm">User Rating</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-emerald-400" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{arSessions}</div>
              <div className="text-slate-400 text-sm">AR Sessions</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Battery className="w-8 h-8 text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">100%</div>
              <div className="text-slate-400 text-sm">Electric</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-yellow-400" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">15min</div>
              <div className="text-slate-400 text-sm">Fast Charge</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SimpleHome;
