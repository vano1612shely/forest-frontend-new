import { Outlet, createFileRoute } from '@tanstack/react-router'

import Header from '@/components/header'

export const Route = createFileRoute('/_layout')({
	component: () => (
		<>
			<Header />
			<section className='py-[16px] px-[24px] pt-[40px] bg-[#F5F5F5] flex-1'>
				<Outlet />
			</section>
		</>
	)
})
