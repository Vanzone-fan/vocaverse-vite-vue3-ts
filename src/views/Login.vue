<template>
	<div class="bg-gradient-to-r from-sky-300 to-indigo-500">
		<div class="flex items-center justify-center min-h-screen">
			<LoginForm @submit="handleLogin" />
		</div>
	</div>
</template>

<script setup lang="ts">
	import LoginForm from '../components/LoginForm.vue';

	const handleLogin = (loginData: { username: string | null; password: string | null }): void => {
		console.log('Received login data:', loginData);
		// 这里可以添加进一步的登录处理逻辑
	};
</script>
