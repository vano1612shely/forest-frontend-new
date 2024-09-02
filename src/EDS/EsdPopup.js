import React, {useEffect, useState} from 'react';
import EsdBlock from './EsdBlock';
import { closeEsdPopup } from '../store/slices/authCustomer';
import { useAppDispatch } from '../store';
import {fetchServerCurrentDateTime} from '../store/slices/directoryServerInfo';

/* eslint-disable react/prop-types */

const EsdPopup = ({ isOpenEsdPopup }) => {
	const [styleAdditional, setStyleAdditional] = useState(null);
	const [isLoginPage, setIsLoginPage] = useState(false);
	const dispatch = useAppDispatch();

	const onClick = () => {
		dispatch(closeEsdPopup());
	}

	useEffect(() => {
		if (isOpenEsdPopup) {
			dispatch(fetchServerCurrentDateTime());
		}
	}, [isOpenEsdPopup])

	useEffect(() => {
		setInterval(() => {
			setIsLoginPage(window.location.pathname === '/customer/login');
		}, 1000);
	}, []);

	const onScrollHandler = () => {
		if (isOpenEsdPopup) {
			const holder = document.querySelector('#esd-block-login-holder');

			if (holder) {
				setStyleAdditional(holder.getBoundingClientRect());
			}
		} else {
			setStyleAdditional(null);
		}
	}

	useEffect(() => {
		const loginBlockWrapper = document.querySelector('#js-login-block-wrapper');
		if (isLoginPage) {
			onScrollHandler();

			window.addEventListener('scroll', onScrollHandler);
			window.addEventListener('resize', onScrollHandler);
			if (loginBlockWrapper) {
				loginBlockWrapper.addEventListener('scroll', onScrollHandler);
			}

			if (!isOpenEsdPopup) {
				setStyleAdditional(null);
			}
		} else {
			setStyleAdditional(null);

			if (window.location.pathname === '/login') {
				dispatch(closeEsdPopup());
			}
		}

		return () => {
			window.removeEventListener('scroll', onScrollHandler);
			window.removeEventListener('resize', onScrollHandler);

			if (loginBlockWrapper) {
				loginBlockWrapper.removeEventListener('scroll', onScrollHandler);
			}
		}
	}, [isOpenEsdPopup, isLoginPage]);

	useEffect(() => {
		return () => {
			dispatch(closeEsdPopup());
		};
	}, []);

	useEffect(() => {
		document.querySelectorAll('[role="presentation"]').forEach((el) => {
			if (isOpenEsdPopup) {
				el.classList.add('hidden');
			} else {
				el.classList.remove('hidden');
			}
		});
	}, [isOpenEsdPopup]);

	const style = { display: 'none' };

	if (styleAdditional) {
		style.top = styleAdditional.top;
		style.left = styleAdditional.left;
		style.bottom = styleAdditional.bottom;
		style.right = styleAdditional.right;
		style.display = 'block';
		style.position = 'fixed';
	}

	return (
		<div
			className={isOpenEsdPopup && !isLoginPage ? 'esd-popup-wrapper' : ''}
			style={style}
			onClick={onClick}
		>
			<EsdBlock isPopup={!isLoginPage} isOpen={isOpenEsdPopup} />
		</div>
	);
};

export default EsdPopup;