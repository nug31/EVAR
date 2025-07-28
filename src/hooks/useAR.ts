import { useEffect, useState } from 'react';
import { webXRUtils } from '../services/api';
import { useAppStore } from '../store/useAppStore';

export const useAR = () => {
  const { 
    isARSupported, 
    isARActive, 
    setARSupported, 
    setARActive, 
    incrementARSessions 
  } = useAppStore();
  
  const [session, setSession] = useState<XRSession | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Check AR support on mount
  useEffect(() => {
    const checkSupport = async () => {
      try {
        const supported = await webXRUtils.checkARSupport();
        setARSupported(supported);
      } catch (err) {
        console.warn('Failed to check AR support:', err);
        setARSupported(false);
      }
    };

    checkSupport();
  }, [setARSupported]);

  const startARSession = async () => {
    if (!isARSupported) {
      setError('AR is not supported on this device');
      return false;
    }

    try {
      setError(null);
      const arSession = await webXRUtils.requestARSession();
      
      if (arSession) {
        setSession(arSession);
        setARActive(true);
        incrementARSessions();

        // Handle session end
        arSession.addEventListener('end', () => {
          setSession(null);
          setARActive(false);
        });

        return true;
      } else {
        setError('Failed to start AR session');
        return false;
      }
    } catch (err: any) {
      setError(err.message || 'Failed to start AR session');
      return false;
    }
  };

  const endARSession = async () => {
    if (session) {
      try {
        await session.end();
      } catch (err) {
        console.warn('Error ending AR session:', err);
      }
      setSession(null);
      setARActive(false);
    }
  };

  return {
    isARSupported,
    isARActive,
    session,
    error,
    startARSession,
    endARSession
  };
};
