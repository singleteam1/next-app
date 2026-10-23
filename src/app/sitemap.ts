import type { MetadataRoute } from 'next'

import { env } from '@/lib/config/env'

// Built per request: the build must not depend on the API being reachable.
export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	/**
	 * Use blog, catalog, etc...
	 */
	// const blog: MetadataRoute.Sitemap = (await getBlog()).map(
	// 	blog => ({
	// 		url: `${env.APP_URL}/blog/${blog.title}`,
	// 		lastModified: new Date(),
	// 		changeFrequency: 'monthly',
	// 		priority: 0.9
	// 	})
	// )

	return [
		{
			url: env.APP_URL,
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 1
		},
		// ...blog
	]
}
