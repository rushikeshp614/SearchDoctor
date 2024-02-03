import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMd } from '@fortawesome/free-solid-svg-icons';
import { useDoctorContext, Doctor } from '../providers/DoctorContext';
import * as styles from './GPMap.module.css';

const GPMapIcon: React.FC<{ gp: Doctor }> = ({ gp }) => {
  const { selectedDoctor, setSelectedDoctor } = useDoctorContext();

  const handleClick = () => {
    setSelectedDoctor(selectedDoctor === gp ? null : gp);
  };

  return (
    <FontAwesomeIcon
      icon={faUserMd}
      size="2x"
      className={`${styles.mapIcon} ${selectedDoctor === gp ? styles.selected : ''}`}
      onClick={handleClick}
    />
  );
};

export default GPMapIcon;
