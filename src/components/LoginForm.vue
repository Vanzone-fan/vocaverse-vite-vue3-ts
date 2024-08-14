<template>
	<div class="p-6 bg-white rounded-xl shadow-2xl flex flex-col items-center">
		<Toast position="top-center" group="success" />
		<Toast position="top-center" group="error" />

		<div class="text-3xl font-bold font-mono mb-6">Login</div>

		<FloatLabel class="mt-4 mb-6 w-full">
			<InputText
				class="w-full"
				id="username"
				v-model="usernameValue"
				:disabled="loading"
				@keyup.enter="loginClick"
			/>
			<label for="username">Username</label>
		</FloatLabel>

		<FloatLabel class="mt-4 mb-6 w-full">
			<InputText
				class="w-full"
				id="password"
				v-model="passwordValue"
				:disabled="loading"
				:type="showPassword ? 'text' : 'password'"
				@keyup.enter="loginClick"
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
			@click="loginClick"
		/>
	</div>
</template>
<script setup lang="ts">
	import { ref } from 'vue';
	import { useToast } from 'primevue/usetoast';
	import axios from 'axios';

	const toast = useToast();
	const usernameValue = ref<string | null>(null);
	const passwordValue = ref<string | null>(null);
	const loading = ref<boolean>(false);
	const showPassword = ref<boolean>(false);

	const togglePasswordVisibility = (): void => {
		showPassword.value = !showPassword.value;
	};

	const validateEmpty = (): void => {
		const isEmpty = !usernameValue.value || !passwordValue.value;
		if (isEmpty) {
			toast.add({
				group: 'error',
				severity: 'error',
				summary: '登录失败',
				detail: '用户名或密码不能为空',
				life: 1000,
			});
		}
	};

	// const validateSuccess = (): void => {
	// 	let resCode:number;
	// 	axios({
	// 		method: 'post',
	// 		url: 'http://localhost:8080/login/user',
	// 		data: {
	// 			userName: usernameValue.value,
	// 			password: passwordValue.value,
	// 		},
	// 	}).then(res => {
	// 		resCode = res.data.code;
	// 		console.log(resCode) // 200
	// 	});
	// 	console.log(resCode) // undefined
	// 	if(resCode==200){
	// 		toast.add({
	// 			group: 'success',
	// 			severity: 'success',
	// 			summary: '登录成功',
	// 			detail: `${usernameValue.value} , 欢迎使用Vocaverse ! `,
	// 			life: 3000,
	// 		});
	// 	}
	// };
	const validateSuccess = async (): Promise<void> => {
		const res = await axios.post('http://localhost:8080/login/user', {
			userName: usernameValue.value,
			password: passwordValue.value,
		});
		const resCode = res.data.code;
		if (resCode == 200) {
			toast.add({
				group: 'success',
				severity: 'success',
				summary: '登录成功',
				detail: `${usernameValue.value} , 欢迎使用Vocaverse ! `,
				life: 1000,
			});
			// 跳转到 profile 页面
			setTimeout(() => {
				window.location.href = '/profile';
			}, 1000); // 等待3秒以显示成功消息，然后跳转
		}
	};

	// 定义提交事件
	const loginClick = (): void => {
		// 判断username和password是否为空 为空去提示
		validateEmpty();
		// 判断username是否存在 不存在去注册

		// 存在去判断密码对不对
		// username存在 password正确 登录成功
		validateSuccess();
	};
</script>
