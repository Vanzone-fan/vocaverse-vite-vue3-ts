<template>
	<div class="p-6 bg-white rounded-xl shadow-2xl flex flex-col items-center">
		<Toast
			position="top-center"
			group="error"
		/>
		<Toast
			position="top-center"
			group="warn"
		>
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
		<Toast
			position="top-center"
			group="success"
			@close="gotoHome"
			@life-end="gotoHome"
		/>

		<div class="text-3xl font-bold font-mono mb-6">登录</div>

		<FloatLabel class="mt-4 mb-6 w-full">
			<InputText
				class="w-full"
				id="username"
				v-model="usernameValue"
				:disabled="loading"
				@keyup.enter="loginClick"
			/>
			<label for="username">用户名</label>
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
			<label for="password">密码</label>
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
			label="登录"
			icon="pi pi-check"
			icon-pos="right"
			:loading="loading"
			@click="loginClick"
		/>

		<Button
			class="mt-4 w-40"
			type="button"
			severity="secondary"
			raised
			label="去注册"
			icon="pi pi-check"
			icon-pos="right"
			@click="gotoReg"
		/>
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import { useToast } from 'primevue/usetoast';
	import axios, { AxiosResponse } from 'axios';
	import { useRouter } from 'vue-router';

	const router = useRouter();
	const toast = useToast();
	const usernameValue = ref<string | null>('Vanzone');
	const passwordValue = ref<string | null>('123456');
	const loading = ref<boolean>(false);
	const showPassword = ref<boolean>(false);

	const togglePasswordVisibility = (): void => {
		showPassword.value = !showPassword.value;
	};

	const validateEmpty = (): boolean => {
		if (!usernameValue.value || !passwordValue.value) {
			toast.add({
				group: 'error',
				severity: 'error',
				summary: '登录失败',
				detail: '用户名或密码不能为空',
				life: 1000,
			});
			return true;
		}
		return false;
	};

	const loginRequest = async (): Promise<void> => {
		loading.value = true;
		const timeout = new Promise((_, reject) =>
			setTimeout(() => reject(new Error('登录超时，请稍后重试')), 5000),
		);

		try {
			const res = (await Promise.race([
				axios.post('http://localhost:8080/login/user', {
					userName: usernameValue.value,
					password: passwordValue.value,
				}),
				timeout,
			])) as { data: { code: number; msg: string; data: any } };

			console.log(res);
			const resCode = res.data.code;

			if (resCode === 404) {
				toast.add({
					group: 'warn',
					severity: 'warn',
					summary: '用户未注册',
				});
			} else if (resCode === 200) {
				toast.add({
					group: 'success',
					severity: 'success',
					summary: '登录成功',
					detail: `${usernameValue.value} , 欢迎使用Vocaverse ! `,
					life: 1000,
				});
				localStorage.setItem('authToken', res.data.data);
			} else {
				throw new Error('未知错误');
			}
		} catch (error) {
			toast.add({
				group: 'error',
				severity: 'error',
				summary: '登录失败',
				detail: error.message || '发生未知错误，请稍后重试',
				life: 1000,
			});
		} finally {
			loading.value = false;
		}
	};

	const loginClick = (): void => {
		if (validateEmpty()) return;
		loginRequest();
	};

	const gotoReg = () => {
		router.push('/register');
	};

	const gotoHome = () => {
		router.push('/home');
	};
</script>
