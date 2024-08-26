import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'redirect',
		component: () => import('../views/Login.vue'),
		meta: { requiresAuth: false },
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('../views/Login.vue'),
		meta: { requiresAuth: false },
	},
	{
		path: '/register',
		name: 'Register',
		component: () => import('../views/Register.vue'),
		meta: { requiresAuth: false },
	},
	{
		path: '/home',
		name: 'Home',
		component: () => import('../views/Home.vue'),
		meta: { requiresAuth: true },
	},
	{
		path: '/profile',
		name: 'Profile',
		component: () => import('../views/Profile.vue'),
		meta: { requiresAuth: true },
	},
	{
		path: '/contact',
		name: 'Contact',
		component: () => import('../views/Contact.vue'),
		meta: { requiresAuth: true },
	},
	{
		path: '/word-list',
		name: 'WordList',
		component: () => import('../components/WordsList.vue'),
		meta: { requiresAuth: true },
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

const parseJWT = (token: string | null): boolean => {
	if (!token) return false;

	try {
		const payloadBase64 = token.split('.')[1];
		const decodedPayload = JSON.parse(atob(payloadBase64));
		const exp = decodedPayload.exp * 1000;
		const current = Date.now();
		return current <= exp;
	} catch (error) {
		console.error('JWT parsing error:', error);
		return false;
	}
};

router.beforeEach((to, from, next) => {
	const token = localStorage.getItem('authToken');
	const isAuthenticated = !!token && parseJWT(token);
	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (isAuthenticated) {
			next();
		} else {
			localStorage.removeItem('authToken');
			next('/login');
		}
	} else {
		next();
	}
});

export default router;
