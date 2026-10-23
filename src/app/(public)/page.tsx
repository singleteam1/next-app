import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Quick setup'
}

export default async function HomePage() {
	return (
		<div className=''>
			Hello world
		</div>
	)
}
