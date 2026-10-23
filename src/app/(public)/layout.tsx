import { type ReactNode } from 'react'

export default function PublicLayout({ children }: { children: ReactNode }) {
	return (
		<div className='relative min-h-screen'>
			{children}
		</div>
	)
}
