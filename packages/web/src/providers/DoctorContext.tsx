import React, { createContext, useContext, useState } from 'react';

interface Coords {
      lat: number;
      lng: number;
    }

interface Doctor {
  name: string;
  address: string;
  location: Coords;
}

interface DoctorContextProps {
    doctors: Doctor[];
    setDoctors: React.Dispatch<React.SetStateAction<Doctor[]>>;
    selectedDoctor: Doctor | null;
    setSelectedDoctor: React.Dispatch<React.SetStateAction<Doctor | null>>;
  }
  

const DoctorContext = createContext<DoctorContextProps | undefined>(undefined);

const DoctorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const contextValue: DoctorContextProps = {
    doctors,
    selectedDoctor,
    setSelectedDoctor,
    setDoctors
  };

  return <DoctorContext.Provider value={contextValue}>{children}</DoctorContext.Provider>;
};

const useDoctorContext = () => {
  const context = useContext(DoctorContext);

  if (!context) {
    throw new Error('useDoctorContext must be used within a DoctorProvider');
  }

  return context;
};

export {Doctor,DoctorProvider,useDoctorContext}