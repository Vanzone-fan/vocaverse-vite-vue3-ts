<template>
	<div class="p-6 bg-white rounded-xl shadow-2xl flex flex-col items-center">
		<Toast position="top-center" group="success" />

		<div class="text-3xl font-bold font-mono mb-6">Register</div>

		<FloatLabel class="mt-4 mb-6 w-full">
			<InputText class="w-full" id="username" v-model="usernameValue" :disabled="loading" />
			<label for="username">Username</label>
		</FloatLabel>

		<FloatLabel class="mt-4 mb-6 w-full">
			<InputText
				class="w-full"
				id="password"
				v-model="passwordValue"
				:disabled="loading"
				:type="showPassword ? 'text' : 'password'"
			/>
			<label for="password">Password</label>
			<i
				:class="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"
				class="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
				@click="togglePasswordVisibility"
			></i>
		</FloatLabel>

		<FloatLabel class="mt-4 mb-6 w-full">
			<InputText
				class="w-full"
				id="confirmPassword"
				v-model="confirmPasswordValue"
				:disabled="loading"
				:type="showPassword ? 'text' : 'password'"
			/>
			<label for="confirmPassword">Confirm Password</label>
			<i
				:class="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"
				class="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
				@click="togglePasswordVisibility"
			></i>
		</FloatLabel>

		<Button
			class="mt-4 w-40"
			type="button"
			severity="info"
			raised
			label="Register"
			icon="pi pi-check"
			icon-pos="right"
			:loading="loading"
			@click="submitForm"
		/>
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import { useToast } from 'primevue/usetoast';

	const toast = useToast();
	const usernameValue = ref<string | null>(null);
	const passwordValue = ref<string | null>(null);
	const confirmPasswordValue = ref<string | null>(null);
	const loading = ref<boolean>(false);
	const showPassword = ref<boolean>(false);

	const togglePasswordVisibility = (): void => {
		showPassword.value = !showPassword.value;
	};

	const showSuccess = (): void => {
		toast.add({
			group: 'success',
			severity: 'success',
			summary: '注册成功',
			detail: `${usernameValue.value}，欢迎加入我们！`,
			life: 3000,
		});
	};

	const submitForm = (): void => {
		loading.value = true;
		console.log('提交注册数据:', usernameValue.value + ' + ' + passwordValue.value);

		// 模拟三秒加载时间
		setTimeout(() => {
			if (passwordValue.value === confirmPasswordValue.value) {
				showSuccess();
			} else {
				toast.add({
					group: 'error',
					severity: 'error',
					summary: '注册失败',
					detail: '两次密码输入不一致，请重试。',
					life: 3000,
				});
			}
			loading.value = false;
		}, 3000); // 延迟三秒
	};
</script>
