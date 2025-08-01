import React, { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Palette,
  RotateCcw,
  Camera,
  Heart,
  Loader,
  Home,
  Car,
  Settings,
  Info
} from 'lucide-react';
import EVModel3D from '../components/3D/EVModel3D';
import ARViewer from '../components/AR/ARViewer';
import { useTeslaModel } from '../hooks/useEVModels';
import { useAppStore } from '../store/useAppStore';

const ARShowroom: React.FC = () => {
  const { teslaModel, isLoading } = useTeslaModel();
  const {
    selectedColor,
    setSelectedColor,
    isFavorite,
    toggleFavorite,
    incrementARSessions
  } = useAppStore();

  const [showARViewer, setShowARViewer] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const colors = [
    { name: 'Ocean Blue', value: '#1E40AF' },
    { name: 'Arctic White', value: '#F8FAFC' },
    { name: 'Midnight Black', value: '#0F172A' },
    { name: 'Ruby Red', value: '#DC2626' },
    { name: 'Forest Green', value: '#059669' },
  ];

  const startARMode = () => {
    setShowARViewer(true);
    incrementARSessions();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 pt-16 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-cyan-400 animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Loading Tesla Model S</h2>
          <p className="text-slate-300">Preparing your AR showroom...</p>
        </div>
      </div>
    );
  }

  if (!teslaModel) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 pt-16 flex items-center justify-center">
        <div className="text-center">
          <Home className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Model Not Available</h2>
          <p className="text-slate-300 mb-4">Unable to load Tesla Model S</p>
          <Link to="/" className="text-cyan-400 hover:text-cyan-300">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
            AR <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">Showroom</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Explore electric vehicles in stunning 3D. Customize, rotate, and experience them in augmented reality.
          </p>
        </div>

        {/* AR Viewer Modal */}
        {showARViewer && teslaModel && (
          <ARViewer
            modelUrl={teslaModel.modelUrl}
            color={selectedColor}
            onClose={() => setShowARViewer(false)}
          />
        )}

        <div className="grid lg:grid-cols-12 gap-8">
          {/* 3D Viewer */}
          <div className="lg:col-span-8">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden">
              <div className="p-6 border-b border-slate-700/50">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">
                    {teslaModel?.brand} {teslaModel?.model} - 3D Preview
                  </h2>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={startARMode}
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-medium rounded-lg hover:from-cyan-600 hover:to-emerald-600 transition-all duration-200"
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      Launch AR
                    </button>
                    <button className="p-2 text-slate-400 hover:text-white transition-colors">
                      <Maximize className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              <div ref={canvasRef} className="h-96 lg:h-[500px] bg-gradient-to-br from-slate-700 to-slate-800">
                <Canvas
                  camera={{ position: [5, 3, 5], fov: 45 }}
                  onCreated={({ gl }) => {
                    gl.setClearColor('#334155', 1);
                  }}
                >
                  <React.Suspense fallback={null}>
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                    <pointLight position={[-10, -10, -10]} />
                    {teslaModel && (
                      <EVModel3D
                        modelUrl={teslaModel.modelUrl}
                        color={selectedColor}
                        scale={1}
                        autoRotate={true}
                      />
                    )}
                    <Environment preset="city" />
                    <OrbitControls enablePan={false} enableZoom={true} enableRotate={true} />
                  </React.Suspense>
                </Canvas>
              </div>

              <div className="p-6 bg-slate-800/30">
                <div className="flex items-center justify-between">
                  <div className="text-slate-300">
                    <p className="text-sm">Controls: Click and drag to rotate • Scroll to zoom</p>
                  </div>
                  <button className="inline-flex items-center px-4 py-2 text-slate-300 hover:text-white transition-colors">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset View
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Controls Panel */}
          <div className="lg:col-span-4 space-y-6">
            {/* Model Info */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Car className="w-5 h-5 mr-2 text-cyan-400" />
                Tesla Model S
              </h3>
              {teslaModel && (
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-cyan-400">{teslaModel.model}</div>
                      <div className="text-sm text-slate-300">{teslaModel.brand}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-slate-300">{teslaModel.range} mi</div>
                      <div className="text-sm font-semibold text-white">${teslaModel.price.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Color Selection */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Palette className="w-5 h-5 mr-2 text-emerald-400" />
                Customize Color
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.value)}
                    className={`relative p-4 rounded-lg border-2 transition-all duration-200 ${
                      selectedColor === color.value
                        ? 'border-cyan-400 scale-105'
                        : 'border-slate-600 hover:border-slate-500'
                    }`}
                    style={{ backgroundColor: color.value }}
                  >
                    <div className="absolute inset-0 rounded-lg bg-black/20" />
                    <div className="relative text-xs font-medium text-white text-center">
                      {color.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Settings className="w-5 h-5 mr-2 text-purple-400" />
                Actions
              </h3>
              <div className="space-y-3">
                <button
                  onClick={toggleFavorite}
                  className={`w-full inline-flex items-center justify-center px-4 py-3 font-medium rounded-lg transition-all duration-200 ${
                    isFavorite
                      ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white'
                      : 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600'
                  }`}
                >
                  <Heart className={`w-4 h-4 mr-2 ${isFavorite ? 'fill-current' : ''}`} />
                  {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
                <Link
                  to="/specs"
                  className="w-full inline-flex items-center justify-center px-4 py-3 bg-slate-700 text-white font-medium rounded-lg hover:bg-slate-600 transition-all duration-200"
                >
                  <Info className="w-4 h-4 mr-2" />
                  View Specifications
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ARShowroom;