<template>
	<div class="bg-gradient-to-r from-sky-300 to-indigo-500">
		<div class="flex items-center justify-center min-h-screen">
			<div class="p-6 bg-white rounded shadow-2xl flex flex-col items-center">
				<div class="text-3xl font-bold font-mono mb-6">Login</div>

				<FloatLabel class="mt-4 mb-6 w-full">
					<InputText class="w-full" id="username" v-model="usernameValue" />
					<label for="username">Username</label>
				</FloatLabel>

				<FloatLabel class="mt-4 mb-6 w-full">
					<InputText class="w-full" id="password" v-model="passwordValue" toggleMask />
					<label for="password">Password</label>
				</FloatLabel>

				<Button
					class="mt-4 w-40"
					type="button"
					severity="info"
					raised
					label="Login"
					icon="pi pi-check"
					icon-pos="right"
					:loading="loading"
					@click="login"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue';

	// 定义 ref 的类型
	const usernameValue = ref<string | null>(null);
	const passwordValue = ref<string | null>(null);
	const loading = ref<boolean>(false);

	const login = (): void => {
		let loginData = ref<object>({
			username: usernameValue.value,
			password: passwordValue.value,
		});
		console.log(loginData.value);
	};
</script>
