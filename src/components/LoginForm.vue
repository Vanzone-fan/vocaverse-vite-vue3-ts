<template>
	<div class="p-6 bg-white rounded-xl shadow-2xl flex flex-col items-center">
		<Toast position="top-center" group="success" />

		<div class="text-3xl font-bold font-mono mb-6">Login</div>

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
	import { ref } from 'vue';
	import { useToast } from 'primevue/usetoast';

	const toast = useToast();
	const usernameValue = ref<string | null>(null);
	const passwordValue = ref<string | null>(null);
	const loading = ref<boolean>(false);
	const showPassword = ref<boolean>(false);
	
	const togglePasswordVisibility = (): void => {
		showPassword.value = !showPassword.value;
	};
	
	const showSuccess = (): void => {
		toast.add({
			group: 'success',
			severity: 'success',
			summary: '登录成功',
			detail: `${usernameValue.value}，新的一天也要认真背单词哦！`,
			life: 3000,
		});
	};

	// 定义提交事件
	const submitForm = (): void => {
		// 判断username和password是否为空 为空去提示
		// 判断username是否存在 不存在去注册
		// 存在去判断密码对不对
		// username存在 password正确 登录成功

		const loginFlag = ref<boolean>(true); // 假设登录标志为 true

		loading.value = true;
		console.log('提交表单数据:', usernameValue.value + ' + ' + passwordValue.value);

		// 模拟三秒加载时间
		setTimeout(() => {
			// 假设的登录逻辑处理
			if (loginFlag.value) {
				showSuccess();
			} else {
				console.log('前往注册');
			}

			loading.value = false;
		}, 3000); // 延迟三秒
	};
</script>
