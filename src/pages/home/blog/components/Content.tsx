// import React from 'react';
import styles from './Content.module.css';

interface ContentProps {
  content: string;
}

export function Content({ content }: ContentProps) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {content.split('\n').map((paragraph, index) => (
          <p key={index} className={styles.paragraph}>
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}