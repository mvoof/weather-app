import React from 'react';

import styles from './Error.module.scss';

interface ErrorProps {
  error: string | null;
}

export const Error: React.FC<ErrorProps> = ({ error }) => {
  return (
    <div className={styles.error}>
      <p>{error || 'Something went wrong'}</p>

      <button onClick={() => window.location.reload()}>Try again</button>
    </div>
  );
};
