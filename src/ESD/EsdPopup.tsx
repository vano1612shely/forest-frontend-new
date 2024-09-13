import React, { useEffect, useState } from 'react'

import { useServerTimeStore } from '@/store/serverTime.store.js'

import EsdBlock from './EsdBlock.tsx'

const EsdPopup = ({ isOpenEsdPopup }) => {
	const [styleAdditional, setStyleAdditional] = useState(null)
	const [isLoginPage, setIsLoginPage] = useState(false)
	const { fetchDateTime } = useServerTimeStore()
	const onClick = () => {}

	useEffect(() => {
		if (isOpenEsdPopup) {
			fetchDateTime()
		}
	}, [isOpenEsdPopup])

	useEffect(() => {
		setInterval(() => {
			setIsLoginPage(window.location.pathname === '/customer/login')
		}, 1000)
	}, [])

	const onScrollHandler = () => {
		if (isOpenEsdPopup) {
			const holder = document.querySelector('#esd-block-login-holder')

			if (holder) {
				setStyleAdditional(holder.getBoundingClientRect())
			}
		} else {
			setStyleAdditional(null)
		}
	}

	useEffect(() => {
		const loginBlockWrapper = document.querySelector('#js-login-block-wrapper')
		if (isLoginPage) {
			onScrollHandler()

			window.addEventListener('scroll', onScrollHandler)
			window.addEventListener('resize', onScrollHandler)
			if (loginBlockWrapper) {
				loginBlockWrapper.addEventListener('scroll', onScrollHandler)
			}

			if (!isOpenEsdPopup) {
				setStyleAdditional(null)
			}
		} else {
			setStyleAdditional(null)
		}

		return () => {
			window.removeEventListener('scroll', onScrollHandler)
			window.removeEventListener('resize', onScrollHandler)

			if (loginBlockWrapper) {
				loginBlockWrapper.removeEventListener('scroll', onScrollHandler)
			}
		}
	}, [isOpenEsdPopup, isLoginPage])

	useEffect(() => {
		document.querySelectorAll('[role="presentation"]').forEach(el => {
			if (isOpenEsdPopup) {
				el.classList.add('hidden')
			} else {
				el.classList.remove('hidden')
			}
		})
	}, [isOpenEsdPopup])

	const style = { display: 'none' }

	if (styleAdditional) {
		style.top = styleAdditional.top
		style.left = styleAdditional.left
		style.bottom = styleAdditional.bottom
		style.right = styleAdditional.right
		style.display = 'block'
		style.position = 'fixed'
	}

	return (
		<div
			className={isOpenEsdPopup && !isLoginPage ? 'esd-popup-wrapper' : ''}
			style={style}
			onClick={onClick}
		>
			<EsdBlock
				isPopup={!isLoginPage}
				isOpen={isOpenEsdPopup}
			/>
		</div>
	)
}

export default EsdPopup
