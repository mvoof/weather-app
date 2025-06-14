import React from 'react';

import styles from './Error.module.scss';

interface ErrorProps {
  error: string;
}

export const Error: React.FC<ErrorProps> = ({ error }) => {
  return (
    <div className={styles.error}>
      <p>{error}</p>

      <button onClick={() => window.location.reload()}>Try again</button>
    </div>
  );
};
