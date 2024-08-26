<template>
	<div class="min-h-screen flex flex-col">
		<Menubar />
		<div class="flex-grow flex items-center justify-center">
			<Card class="w-64">
				<template #title>Profile</template>
				<template #content>
					<p class="m-0">123</p>
				</template>
				<template #footer>
					<Button
						size="large"
						label="修改个人信息"
						severity="primary"
					></Button>
				</template>
			</Card>
		</div>
	</div>
</template>

<script setup lang="ts">
	import Menubar from '../components/Menubar.vue';
	import Card from 'primevue/card';
</script>
