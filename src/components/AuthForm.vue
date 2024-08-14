<template>
	<div class="p-6 bg-white rounded-xl shadow-2xl flex flex-col items-center">
		<Toast position="top-center" group="success" />

		<div class="text-3xl font-bold font-mono mb-6">{{ title }}</div>

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

		<!-- 仅在注册页面显示确认密码 -->
		<FloatLabel v-if="isRegister" class="mt-4 mb-6 w-full">
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
			:label="buttonLabel"
			icon="pi pi-check"
			icon-pos="right"
			:loading="loading"
			@click="submitForm"
		/>
	</div>
</template>

<script setup lang="ts">
	import { ref, defineProps } from 'vue';
	import { useToast } from 'primevue/usetoast';

	// 接收父组件传入的属性
	const props = defineProps({
		isRegister: { type: Boolean, default: false },
		title: { type: String, required: true },
		buttonLabel: { type: String, required: true },
		successMessage: { type: String, required: true },
		errorMessage: { type: String, default: '' },
	});

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
			summary: 'Success',
			detail: props.successMessage,
			life: 3000,
		});
	};

	const submitForm = (): void => {
		loading.value = true;
		console.log('提交数据:', usernameValue.value + ' + ' + passwordValue.value);

		setTimeout(() => {
			if (props.isRegister && passwordValue.value !== confirmPasswordValue.value) {
				toast.add({
					group: 'error',
					severity: 'error',
					summary: 'Error',
					detail: props.errorMessage || 'Passwords do not match. Please try again.',
					life: 3000,
				});
			} else {
				showSuccess();
			}
			loading.value = false;
		}, 3000);
	};
</script>
