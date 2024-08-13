<template>
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
			@click="submitForm"
		/>
	</div>
</template>

<script setup lang="ts">
	import { ref, defineEmits } from 'vue';

	// 定义 ref 的类型
	const usernameValue = ref<string | null>(null);
	const passwordValue = ref<string | null>(null);
	const loading = ref<boolean>(false);

	// 定义提交事件
	const emit = defineEmits(['submit']);
	const submitForm = (): void => {
		loading.value = true;
		let loginData = {
			username: usernameValue.value,
			password: passwordValue.value,
		};
		emit('submit', loginData);
		loading.value = false;
	};
</script>
