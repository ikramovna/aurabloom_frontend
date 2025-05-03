import React from 'react';
import styles from '../styles/layout.module.css';


interface PageContainerProps {
  children: React.ReactNode;
}

export function PageContainer({ children }: PageContainerProps) {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        {children}
      </div>
    </div>
  );
}