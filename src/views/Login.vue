<template>
	<div class="bg-gradient-to-r from-sky-300 to-indigo-500">
		<div class="flex items-center justify-center min-h-screen">
			<AuthForm
				:title="'Login'"
				:buttonLabel="'Login'"
				:successMessage="`${usernameValue}，欢迎回来！`"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
	import AuthForm from '../components/AuthForm.vue';
</script>
