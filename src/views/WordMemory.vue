<template>
	<div class="min-h-screen flex flex-col">
		<Menubar />

		<div class="flex flex-grow justify-center items-center bg-stone-100">
			<Card class="w-96 shadow-lg rounded-lg p-6 bg-stone-100">
				<template #title>
					<h2
						class="text-2xl font-semibold text-center text-gray-800"
					>
						联系我们
					</h2>
				</template>
				<template #content>
					<div class="flex justify-between items-center mt-4">
						<Image
							src="../src/assets/Vanzone-Code.jpg"
							alt="WeChat QR Code"
							width="100"
							class="rounded-lg border border-gray-300"
							preview
						/>

						<div>
							<div class="flex flex-col mb-4">
								<span class="text-lg font-medium text-gray-700"
									>电话</span
								>
								<span class="text-lg text-gray-600"
									>155-3542-6166</span
								>
							</div>
							<div class="flex flex-col">
								<span class="text-lg font-medium text-gray-700"
									>邮箱</span
								>
								<span class="text-lg text-gray-600"
									>2329582412@qq.com</span
								>
							</div>
						</div>
					</div>
				</template>
			</Card>
		</div>
	</div>
</template>

<script setup lang="ts">
	import Menubar from '../components/Menubar.vue';
</script>

<style scoped></style>
