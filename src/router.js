import { createWebHistory, createRouter } from 'vue-router';
import MainContent from './MainContent.vue';

const routes = [
	{
		path: '/',
		name: 'MainContent',
		component: MainContent,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;