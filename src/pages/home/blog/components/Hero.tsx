// import React from 'react';
import styles from './Hero.module.css';

interface HeroProps {
  title: string;
  imageUrl: string;
}

export function Hero({ title, imageUrl }: HeroProps) {
  return (
    <div className={styles.hero}>
      <img
        src={imageUrl}
        alt={title}
        className={styles.image}
      />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h1 className={styles.title}>
          {title}
        </h1>
      </div>
    </div>
  );
}