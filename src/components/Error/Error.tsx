import React from 'react';
import './Error.scss';

interface ErrorProps {
	error: string;
}

export const Error: React.FC<ErrorProps> = ({ error }) => {
	return (
		<div className="error">
			<p>{error}</p>

			<button onClick={() => window.location.reload()}>Try again</button>
		</div>
	);
};
