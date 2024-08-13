import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';

// 定义路由规则
const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{ path: '/login', name: 'Login', component: () => import('../views/Login.vue') },
	{
		path: '/about',
		name: 'About',
		component: About,
	},
];

// 创建路由实例并传递 `routes` 配置
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL), // 使用 HTML5 的历史记录模式
	routes,
});

export default router;
