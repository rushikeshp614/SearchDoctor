import GoogleMapReact from 'google-map-react';
import React, { useState } from 'react';
import { useEffectAsync } from '../hooks/useEffectAsync';
import useGeolocation  from '../hooks/useGeolocation';
import { useDoctorContext, Doctor } from '../providers/DoctorContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMd } from '@fortawesome/free-solid-svg-icons';
import * as styles from '../styles/GPMap.module.css';
import dotenv from 'dotenv';
dotenv.config({path:"../../.env"});

interface Coords {
  lat: number;
  lng: number;
}

const GPMap: React.FC = () => {
  const { doctors, setDoctors, selectedDoctor, setSelectedDoctor } = useDoctorContext();
  const userCurrentLocation = useGeolocation();

  useEffectAsync(async () => {
    if (!userCurrentLocation) {
      return;
    }

    try {
      const gpsResponse = await fetch(
        `http://localhost:3000/gps?lat=${userCurrentLocation.lat}&lng=${userCurrentLocation.lng}`
      );
      const gpsRaw = await gpsResponse.json();
      setDoctors(gpsRaw);
    } catch (error) {
      console.error('Error fetching GPS data:', error);
    }
  }, [userCurrentLocation]);

  const handleDoctorClick = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
  };

  return (
    <div className={styles.container}>
      <div className={styles.listView}>
        <ul>
          {doctors.map((gp: Doctor) => (
            <li
              key={gp.name}
              onClick={() => handleDoctorClick(gp)}
              className={`${styles.listItem} ${selectedDoctor === gp ? styles.selected : ''}`}
            >
              {gp.name}
            </li>
          ))}
        </ul>
      </div>

      {doctors.length > 0 && (
        <div className={styles.mapContainer}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: `${process.env.API_KEY}` }}
            defaultCenter={userCurrentLocation as Coords | undefined}
            defaultZoom={13}
          >
            {doctors.map((gp: Doctor) => (
              <GPMapIcon
                key={gp.name}
                gp={gp}
                lat={gp.location.lat}
                lng={gp.location.lng}
                text={gp.name}
                selected={selectedDoctor === gp}
                handleIconClick={() => handleDoctorClick(gp)}
              ></GPMapIcon>
            ))}
          </GoogleMapReact>
        </div>
      )}
    </div>
  );
};

const GPMapIcon = ({  selected, handleIconClick }: any) => {
  return (
    <FontAwesomeIcon
      icon={faUserMd}
      size="2x"
      className={`${styles.mapIcon} ${selected ? styles.selected : ''}`}
      onClick={handleIconClick}
    ></FontAwesomeIcon>
  );
};

export default GPMap
