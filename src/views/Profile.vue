<template>
	<div class="min-h-screen flex flex-col bg-gradient-to-r from-sky-200 to-indigo-200">
		<Toast />
		<Menubar />
		<div class="mt-8 flex flex-col lg:flex-row w-11/12 mx-auto">

			<div class="left w-full lg:w-2/5 lg:pl-44 lg:pr-8">
				<img
					:src="user_data.avatar"
					alt="Avatar"
					class="w-32 h-32 sm:w-40 sm:h-40 lg:w-60 lg:h-60 rounded-full border-2 border-white shadow-md mx-auto lg:mx-0"
				/>

				<div v-if="profileEditFlag">
					<h1 class="text-2xl font-bold pt-4 text-center lg:text-left">{{ user_data.nickname }}</h1>
					<p class="text-lg text-gray-600 text-center lg:text-left">{{ user_data.username }}</p>
					<p class="text-lg pt-4 text-center lg:text-left">{{ user_data.signature }}</p>

					<Button
						label="编辑信息"
						severity="contrast"
						class="w-full mt-4"
						@click="profileEditFlag = !profileEditFlag"
					/>

					<div class="flex flex-row items-center mt-4 justify-center lg:justify-start">
						<i class="pi pi-map-marker mr-4"></i>
						<p class="text-lg text-gray-600">{{ user_data.school }}</p>
					</div>
				</div>
				<div v-else>
					<p class="text-lg pt-4 text-center lg:text-left">{{ user_data.signature }}</p>

					<Button
						label="保存"
						severity="success"
						class="w-full mt-4"
						@click="profileEditFlag = !profileEditFlag"
					/>
					<Button
						label="取消"
						severity="danger"
						class="w-full mt-4"
						@click="profileEditFlag = !profileEditFlag"
					/>
				</div>
			</div>

			<div class="right w-full lg:w-3/5 mt-8 lg:mt-0">
				<!-- 其他内容 -->
				<div class="study-progress lg:w-full">
					<div class="mb-4">正在学习</div>
					<div class="flex flex-row justify-start gap-x-4 overflow-x-auto scrollbar-hide">
						<div class="border-2 border-solid border-neutral-400 w-[7.5rem] h-40 flex flex-col justify-around items-center">
							<img
								src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLnC6a7whGtqKr222x9Jec5akudWY231ebYA&s"
								alt=""
							/>
							<span class="dictionary-title">四级词汇</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import Menubar from '../components/Menubar.vue';
	import Button from 'primevue/button';
	import { ref } from 'vue';


	const user_data = {
		username: 'John Doe',
		nickname: 'Johnny',
		signature: '可以脆弱 可以是不完美的可以脆弱 我被高山围绕 山水自为我祈祷',
		password: '********',
		gender: '男',
		phone: '123-456-7890',
		qq: '123456789',
		email: 'john.doe@example.com',
		wechat: 'johnny123',
		school: 'XYZ University',
		avatar: 'https://via.placeholder.com/150',
	};

	
	const profileEditFlag = ref(true);
	
</script>

<style scoped>
/* 相关样式 */
</style>
