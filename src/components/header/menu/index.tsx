import {
	Link,
	LinkProps,
	ParseRoute,
	useLocation
} from '@tanstack/react-router'
import _ from 'lodash'
import { FC, useEffect, useState } from 'react'

import { MenuListItem, menuList } from '@/components/header/menu/menu_list.ts'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu.tsx'

import { useAuthStore } from '@/store/auth.store.ts'

import './style.scss'
import { cn } from '@/lib/utils.ts'
import { routeTree } from '@/routeTree.gen.ts'

interface INavItemProps extends LinkProps {
	link: MenuListItem
}
export const NavItem: FC<INavItemProps> = ({ link, ...props }) => {
	const userRoles = useAuthStore(state => state.roles)
	const location = useLocation()
	const [active, setActive] = useState(false)
	useEffect(() => {
		if (
			link.isDropDown &&
			_.some(link.items, i => i.link === location.pathname)
		) {
			setActive(true)
		} else {
			setActive(false)
		}
	}, [location])
	if (userRoles.some(role => link.roles.includes(role))) {
		if (link.isDropDown) {
			return (
				<li className='menu__item'>
					<DropdownMenu>
						<DropdownMenuTrigger
							className={cn('menu__link', active && 'active')}
						>
							{link.title}
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							{link.items?.map((item, index) => {
								if (userRoles.some(role => item.roles.includes(role)))
									return (
										<Link
											key={index + item.link}
											/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
											// @ts-expect-error
											to={item.link as ParseRoute<typeof routeTree>['fullPath']}
											target={item.isExternalLink ? '_blank' : '_self'}
											{...props}
										>
											<DropdownMenuItem>{item.title}</DropdownMenuItem>
										</Link>
									)
							})}
						</DropdownMenuContent>
					</DropdownMenu>
				</li>
			)
		}

		return (
			<li className='menu__item'>
				<Link
					className={cn('menu__link')}
					/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
					// @ts-expect-error
					to={link.link as ParseRoute<typeof routeTree>['fullPath']}
					target={link.isExternalLink ? '_blank' : '_self'}
					{...props}
				>
					{link.title}
				</Link>
			</li>
		)
	}
}

export const Menu = () => {
	return (
		<nav className='menu'>
			<ul className='menu__list'>
				{menuList.map((item, index) => {
					return (
						<NavItem
							key={index}
							link={item}
						/>
					)
				})}
			</ul>
		</nav>
	)
}
