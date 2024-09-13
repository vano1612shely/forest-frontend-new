import { Link } from '@tanstack/react-router'
import dayjs from 'dayjs'
import 'dayjs/locale/uk.js'
import localizedFormat from 'dayjs/plugin/localizedFormat'

import { Menu } from '@/components/header/menu'
import { Notifications } from '@/components/header/notifications'
import { UserBlock } from '@/components/header/userBlock'
import { useTheme } from '@/components/theme-provider.tsx'
import { ThemeToggle } from '@/components/themeToggle.tsx'
import { Button } from '@/components/ui/button.tsx'

// import Facebook from '@/assets/img/header/greenFacebook.png'
// import Telegram from '@/assets/img/header/greenTelegram.png'
// import Viber from '@/assets/img/header/greenViber.png'
// import bannerDesktopUa from '@/assets/img/header/partnersBanks.jpg'
// import bannerMobileUa from '@/assets/img/header/partnersBanksMobile.jpg'
import Logo from '@/assets/logoGreen.png'
import LogoDark from '@/assets/logoGreenWhite.png'

import { useAuthStore } from '@/store/auth.store.ts'
import { useServerTimeStore } from '@/store/serverTime.store.ts'

import './style.scss'

dayjs.extend(localizedFormat)
dayjs.locale('uk')
const Header = () => {
	const { theme } = useTheme()
	const currentTime = useServerTimeStore(state => state.current_datetime)
	const is_auth = useAuthStore(state => state.is_auth)
	return (
		<header>
			<div className='bg-background py-3 px-10 flex justify-evenly md:justify-between items-center border-b flex-wrap gap-[30px]'>
				<div className='lg:w-[300px]'>
					{!is_auth ? (
						<Link to='/customer/login'>
							<Button className='text-[0.875rem] leading-[1.75] font-[500]'>
								Увійти
							</Button>
						</Link>
					) : (
						<UserBlock />
					)}
				</div>
				<Link to='/'>
					<img
						src={theme === 'dark' ? LogoDark : Logo}
						alt='logo'
						className='h-[50px]'
					/>
				</Link>
				<div className='flex gap-[30px] items-center w-[300px] flex-wrap justify-evenly md:justify-normal'>
					{/*<ul className='social'>*/}
					{/*	<li className='social__item'>*/}
					{/*		<a href='/'>*/}
					{/*			<img*/}
					{/*				src={Facebook}*/}
					{/*				alt=''*/}
					{/*			/>*/}
					{/*		</a>*/}
					{/*	</li>*/}
					{/*	<li className='social__item viber'>*/}
					{/*		<a href='/'>*/}
					{/*			<img*/}
					{/*				src={Viber}*/}
					{/*				alt=''*/}
					{/*			/>*/}
					{/*		</a>*/}
					{/*	</li>*/}
					{/*	<li className='social__item'>*/}
					{/*		<a href='/'>*/}
					{/*			<img*/}
					{/*				src={Telegram}*/}
					{/*				alt=''*/}
					{/*			/>*/}
					{/*		</a>*/}
					{/*	</li>*/}
					{/*</ul>*/}
					{is_auth && <Notifications />}
					<ThemeToggle />
					<p className='text-[12px] text-muted-foreground'>
						{currentTime && 'Київ ' + dayjs(currentTime).format('MMM D, HH:mm')}
					</p>
				</div>
			</div>
			<Menu />
			{/*<a*/}
			{/*	href='https://www.uub.com.ua/torgy-ta-auktsiony/neobroblena-derevna-ta-plomaterial/mozhlyvosti-kredytuvannya-dlya-uchasnykiv-torgiv/'*/}
			{/*	target='_blank'*/}
			{/*>*/}
			{/*	<picture>*/}
			{/*		<source*/}
			{/*			srcSet={bannerDesktopUa}*/}
			{/*			media='(min-width: 900px)'*/}
			{/*		/>*/}
			{/*		<img*/}
			{/*			className='w-full'*/}
			{/*			src={bannerMobileUa}*/}
			{/*			alt='rebuild economy'*/}
			{/*		/>*/}
			{/*	</picture>*/}
			{/*</a>*/}
		</header>
	)
}

export default Header
