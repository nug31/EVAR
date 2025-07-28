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
  Star
} from 'lucide-react';
import { useTeslaModel } from '../hooks/useEVModels';
import { useAppStore } from '../store/useAppStore';

const Home: React.FC = () => {
  const { teslaModel, isLoading } = useTeslaModel();
  const { arSessions, isFavorite } = useAppStore();

  const stats = [
    { label: 'EV Models', value: '150+', icon: Car },
    { label: 'Charging Stations', value: '50K+', icon: Zap },
    { label: 'AR Experiences', value: '25+', icon: Camera },
    { label: 'Global Users', value: '100K+', icon: Globe }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-emerald-500/10" />
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-8">
            <span className="block text-white mb-4">Experience EVs in</span>
            <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Augmented Reality
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Discover, customize, and explore electric vehicles like never before with cutting-edge AR technology.
            Your complete EV companion in one powerful web app.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/showroom"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-emerald-600 transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
            >
              Launch AR Showroom
              <Camera className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/charging"
              className="inline-flex items-center px-8 py-4 bg-slate-800 text-white font-semibold rounded-xl border border-slate-600 hover:bg-slate-700 transition-all duration-200"
            >
              Find Charging Stations
              <MapPin className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 rounded-xl mb-4">
                      <IconComponent className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div className="text-2xl lg:text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-slate-400">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
              Powerful AR Features
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Everything you need to explore, understand, and connect with electric vehicles
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Link
                  key={index}
                  to={feature.path}
                  className="group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="flex items-start space-x-6">
                    <div className={`flex-shrink-0 w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-slate-300 mb-4 leading-relaxed">
                        {feature.description}
                      </p>
                      <div className="inline-flex items-center text-cyan-400 font-medium group-hover:text-cyan-300 transition-colors">
                        Explore Feature
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-slate-900/50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-8">
            Built with Cutting-Edge Tech
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
              <Camera className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">WebXR Technology</h3>
              <p className="text-slate-300">Advanced web-based AR experiences without app installation</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
              <Smartphone className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Cross-Platform</h3>
              <p className="text-slate-300">Works seamlessly across iOS, Android, and desktop browsers</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
              <Battery className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Real-Time Data</h3>
              <p className="text-slate-300">Live EV specifications, charging station status, and more</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;