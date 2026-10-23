'use client'

import { Loader } from "lucide-react"

export function EllipsisLoader() {
	return (
		<div className='flex items-center justify-center gap-3'>
			<Loader className="animate-spin" />
		</div>
	)
}
