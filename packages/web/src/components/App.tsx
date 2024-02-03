import React from 'react';  
import { DoctorProvider } from '../providers/DoctorContext';
import GPMap  from './GPMap';
import * as styles from '../styles/App.module.css';

function App() {
  return (
    <DoctorProvider>
      <div className={styles.navbar}>
        <div className={styles.brand}>
          <a href="#">GP Search</a>
        </div>
      </div>

      <div className={styles.mapContainer}>
        <GPMap />
      </div>
    </DoctorProvider>
  );
}

export default App