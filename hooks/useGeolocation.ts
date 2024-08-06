import { useState, useEffect, useRef, useCallback } from 'react';

interface Location {
  lat: number;
  lon: number;
}

const useGeolocation = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [tracking, setTracking] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const watchId = useRef<number | null>(null);

  const startTracking = useCallback(() => {
    if (navigator.geolocation) {
      watchId.current = navigator.geolocation.watchPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
          setError(null);
        },
        (err) => {
          setError(err.message);
        }
      );
      setTracking(true);
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, []);

  const stopTracking = useCallback(() => {
    if (watchId.current !== null) {
      navigator.geolocation.clearWatch(watchId.current);
      watchId.current = null;
      setTracking(false);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (watchId.current !== null) {
        navigator.geolocation.clearWatch(watchId.current);
      }
    };
  }, []);

  return {
    location,
    tracking,
    error,
    startTracking,
    stopTracking,
  };
};

export default useGeolocation;
