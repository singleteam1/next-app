export const env = {
	NODE_ENV: process.env.NODE_ENV || 'production',

	APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'https://next-app.com',
	API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://api.next-app.com',
} as const
