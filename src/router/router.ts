import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

// 定义路由规则
const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'redirect',
		component: () => import('../views/Login.vue'),
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('../views/Login.vue'),
	},
	{
		path: '/register',
		name: 'Register',
		component: () => import('../views/Register.vue'),
	},
	{
		path: '/home',
		name: 'Home',
		component: () => import('../views/Home.vue'),
	},
	{
		path: '/profile',
		name: 'Profile',
		component: () => import('../views/Profile.vue'),
	},
	{
		path: '/contact',
		name: 'Contact',
		component: () => import('../views/Contact.vue'),
	},
];

// 创建路由实例并传递 `routes` 配置
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL), // 使用 HTML5 的历史记录模式
	routes,
});

export default router;
