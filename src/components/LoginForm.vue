<template>
	<div class="p-6 bg-white rounded-xl shadow-2xl flex flex-col items-center">
		<Toast position="top-center" group="error" />
		<Toast position="top-center" group="warn">
			<template #message="slotProps">
				<div class="flex flex-col items-start flex-auto">
					<div class="font-medium text-lg my-4">
						{{ slotProps.message.summary }}
					</div>
					<Button
						size="small"
						label="去注册"
						severity="warn"
						@click="gotoReg"
					></Button>
				</div>
			</template>
		</Toast>
		<Toast position="top-center" group="success" @close="gotoHome" @life-end="gotoHome"/>

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
	const usernameValue = ref<string | null>('Vanzone');
	const passwordValue = ref<string | null>('123456');
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
				life:1000
			});
		}
	};

	const validateNotReg = () => {
		toast.add({
			group: 'warn',
			severity: 'warn',
			summary: '登录失败, 用户不存在',
			detail: '用户不存在',
		});
	};
	const gotoReg = () => {
		window.location.href = '/register';
	};
	const validateSuccess = async (): Promise<void> => {
		loading.value = true
		const res = await axios.post('http://localhost:8080/login/user', {
			userName: usernameValue.value,
			password: passwordValue.value,
		});
		const resCode = res.data.code;
		loading.value=false
		if (resCode == 200) {
			toast.add({
				group: 'success',
				severity: 'success',
				summary: '登录成功',
				detail: `${usernameValue.value} , 欢迎使用Vocaverse ! `,
				life: 1000,
			});
		}
	};
const gotoHome = ()=>{
	window.location.href='/profile'
}
	// 定义提交事件
	const loginClick = (): void => {
		// 判断username和password是否为空 为空去提示
		validateEmpty();
		// 判断username是否存在 不存在去注册
		// validateNotReg();
		// 存在去判断密码对不对
		// username存在 password正确 登录成功
		validateSuccess();
	};
</script>
