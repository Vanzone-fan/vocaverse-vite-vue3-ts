<template>
	<div class="bg-gradient-to-r from-sky-300 to-indigo-500">
		<div class="flex items-center justify-center min-h-screen">
			<AuthForm
				:isRegister="true"
				:title="'Register'"
				:buttonLabel="'Register'"
				:successMessage="`${usernameValue}，欢迎加入我们！`"
				:errorMessage="'两次密码输入不一致，请重试。'"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
	import AuthForm from '../components/AuthForm.vue';
</script>
