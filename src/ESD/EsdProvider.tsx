import { ReactNode } from 'react'

import EsdPopup from './EsdPopup.tsx'

const EsdProvider = ({ children }: { children: ReactNode }) => {
	const isOpenEsdPopup = true

	return (
		<>
			{children}
			<EsdPopup isOpenEsdPopup={isOpenEsdPopup} />
		</>
	)
}

export default EsdProvider
