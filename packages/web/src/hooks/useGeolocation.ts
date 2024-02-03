import { useEffect, useState } from 'react';

interface Coords {
  lat: number;
  lng: number;
}

const useGeolocation = (): Coords | null => {
  const [location, setLocation] = useState<Coords | null>(null);

  useEffect(() => {
    const getUserLocation = () => {
      return new Promise<Coords>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => {
            reject(error);
          }
        );
      });
    };

    getUserLocation()
      .then((userLocation) => setLocation(userLocation))
      .catch((error) => console.error('User location error:', error));
  }, []);

  return location;
};

export default useGeolocation;