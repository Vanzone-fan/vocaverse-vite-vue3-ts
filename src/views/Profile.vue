<template>
	<div class="min-h-screen flex flex-col">
		<Menubar />
		<div class="flex-grow flex items-center justify-center">
			<Card class="w-80 overflow-hidden rounded-full">
				<template #header>
					<img
						alt="user header"
						src="../assets/default-avatar-female.png"
					/>
				</template>
				<template #title>个人信息</template>
				<template #subtitle>Card subtitle</template>
				<template #content>
					<p class="m-0">
						Lorem ipsum dolor sit amet, consectetur adipisicing
						elit. Inventore sed consequuntur error repudiandae
						numquam deserunt quisquam repellat libero asperiores
						earum nam nobis, culpa ratione quam perferendis esse,
						cupiditate neque quas!
					</p>
				</template>
				<template #footer>
					<div class="flex gap-4 mt-1">
						<Button
							label="Save"
							class="w-full"
						/>
					</div>
				</template>
			</Card>
		</div>
	</div>
</template>

<script setup lang="ts">
	import Menubar from '../components/Menubar.vue';
	import Card from 'primevue/card';
	import Button from 'primevue/button';
</script>
