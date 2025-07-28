import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap, User, Camera } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'AR Showroom', path: '/showroom' },
    { name: 'Charging', path: '/charging' },
    { name: 'Maintenance', path: '/maintenance' },
    { name: 'Compare', path: '/comparison' },
    { name: 'Profile', path: '/profile' },
  ];

  return (
    <header className="bg-slate-900/95 backdrop-blur-sm border-b border-cyan-500/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-cyan-400 to-emerald-400 p-2 rounded-lg">
              <Zap className="w-6 h-6 text-slate-900" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              EV-AR
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  location.pathname === item.path
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-800'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* AR Status & Profile */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-emerald-500/20 px-3 py-1 rounded-full">
              <Camera className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 text-sm font-medium">AR Ready</span>
            </div>
            <Link to="/profile" className="p-2 text-slate-300 hover:text-cyan-400 transition-colors">
              <User className="w-6 h-6" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-cyan-400 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-700">
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    location.pathname === item.path
                      ? 'bg-cyan-500/20 text-cyan-400'
                      : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-800'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                <div className="flex items-center space-x-2 bg-emerald-500/20 px-3 py-1 rounded-full">
                  <Camera className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 text-sm font-medium">AR Ready</span>
                </div>
                <Link to="/profile" className="p-2 text-slate-300 hover:text-cyan-400">
                  <User className="w-6 h-6" />
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;