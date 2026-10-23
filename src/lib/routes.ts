export const ROUTES = {
	HOME: '/',
	AUTH: {
		LOGIN: (redirectTo?: string) =>
			redirectTo ? `/auth/login?redirectTo=${redirectTo}` : '/auth/login',
		REGISTER: '/auth/register',
	},
	ACCOUNT: {
		ROOT: '/account',
		ABOUT: '/account/about',
	}
} as const
