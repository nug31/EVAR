import React, { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import EVModel3D from '../3D/EVModel3D';
import { useAR } from '../../hooks/useAR';
import { Camera, X, RotateCcw } from 'lucide-react';

interface ARViewerProps {
  modelUrl: string;
  color: string;
  onClose?: () => void;
}

const ARViewer: React.FC<ARViewerProps> = ({ modelUrl, color, onClose }) => {
  const { isARSupported, isARActive, startARSession, endARSession, error } = useAR();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleStartAR = async () => {
    if (isARSupported) {
      const success = await startARSession();
      if (success) {
        setIsFullscreen(true);
      }
    } else {
      // Fallback to fullscreen 3D viewer
      setIsFullscreen(true);
    }
  };

  const handleEndAR = async () => {
    if (isARActive) {
      await endARSession();
    }
    setIsFullscreen(false);
    onClose?.();
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isFullscreen) {
        handleEndAR();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isFullscreen]);

  if (!isFullscreen) {
    return (
      <div className="flex flex-col items-center space-y-4">
        <button
          onClick={handleStartAR}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-medium rounded-lg hover:from-cyan-600 hover:to-emerald-600 transition-all duration-200 transform hover:scale-105"
        >
          <Camera className="w-5 h-5 mr-2" />
          {isARSupported ? 'Launch AR' : 'View in 3D'}
        </button>
        
        {error && (
          <div className="text-red-400 text-sm text-center max-w-md">
            {error}
          </div>
        )}
        
        {!isARSupported && (
          <div className="text-yellow-400 text-sm text-center max-w-md">
            AR not supported on this device. You can still view in 3D mode.
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* AR/3D Canvas */}
      <div ref={canvasRef} className="w-full h-full">
        <Canvas
          camera={{ position: [0, 2, 5], fov: 45 }}
          gl={{ alpha: true, antialias: true }}
        >
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          <EVModel3D
            modelUrl={modelUrl}
            color={color}
            scale={1}
            autoRotate={!isARActive}
          />
          <Environment preset="city" />
          {!isARActive && (
            <OrbitControls enablePan={false} enableZoom={true} enableRotate={true} />
          )}
        </Canvas>
      </div>

      {/* UI Overlay */}
      <div className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/50 to-transparent">
        <div className="flex items-center justify-between">
          <div className="text-white">
            <h2 className="text-xl font-bold">
              {isARActive ? 'AR Mode' : '3D Viewer'}
            </h2>
            <p className="text-sm opacity-75">
              {isARActive ? 'Move your device to explore' : 'Drag to rotate, scroll to zoom'}
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            {!isARActive && (
              <button
                onClick={() => {
                  // Reset camera position
                  if (canvasRef.current) {
                    // This would reset the OrbitControls
                  }
                }}
                className="p-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            )}
            
            <button
              onClick={handleEndAR}
              className="p-2 bg-red-500/80 text-white rounded-lg hover:bg-red-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Instructions */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/50 to-transparent">
        <div className="text-center text-white">
          {isARActive ? (
            <div>
              <p className="text-sm opacity-75 mb-2">
                Point your camera at a flat surface to place the vehicle
              </p>
              <p className="text-xs opacity-50">
                Tap to place • Pinch to scale • Drag to rotate
              </p>
            </div>
          ) : (
            <div>
              <p className="text-sm opacity-75 mb-2">
                Explore the vehicle in 3D
              </p>
              <p className="text-xs opacity-50">
                Drag to rotate • Scroll to zoom • Press ESC to exit
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ARViewer;
