import React from 'react';
import { useSelector } from 'react-redux';
import EsdPopup from './EsdPopup';

/* eslint-disable react/prop-types */

const EsdProvider = ({ children }) => {
	const isOpenEsdPopup = useSelector((state) => state.authCustomerSlice.isOpenEsdPopup);

	return (
		<>
			{children}
			<EsdPopup isOpenEsdPopup={isOpenEsdPopup} />
		</>
	);
};

export default EsdProvider;