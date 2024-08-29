<template>
	<div class="min-h-screen flex flex-col bg-gradient-to-r from-sky-200 to-indigo-200">
		<Toast />
		<Menubar />
		<div class="mt-8 flex flex-col lg:flex-row w-11/12 mx-auto">
			<Dialog
				v-model:visible="changeAvatarVisible"
				modal
				header="修改头像"
			>
				<!-- TODO:上传url需要修改 -->
				<!-- TODO:name参数要不要改？ -->
				<FileUpload
					name="avatar[]"
					url="https://httpbin.org/post"
					@upload="onSuccessUpload"
					accept="image/*"
					:multiple="false"
					@select="onSelectedFiles"
				>
					<template #header="{ chooseCallback, uploadCallback, clearCallback, files }">
						<div class="flex flex-wrap justify-between items-center flex-1 gap-4">
							<div class="flex gap-2">
								<Button
									@click="chooseCallback()"
									icon="pi pi-images"
									rounded
									outlined
									severity="secondary"
									:disabled="files && files.length === 1"
								></Button>
								<!-- TODO:上传文件部分函数要改 -->
								<Button
									@click="uploadEvent(uploadCallback)"
									icon="pi pi-cloud-upload"
									rounded
									outlined
									severity="success"
									:disabled="!files || files.length === 0"
								></Button>
								<!-- TODO:清空选择部分要改 尤其是上传成功的也要删除 -->
								<!-- TODO:上传以后又想换回去原头像 那么如何优化请求发送 是在最后统一save好点还是来回修改 -->
								<Button
									@click="clearCallback()"
									icon="pi pi-times"
									rounded
									outlined
									severity="danger"
									:disabled="!files || files.length === 0"
								></Button>
							</div>
						</div>
					</template>
					<template #content="{ files, uploadedFiles, removeUploadedFileCallback, removeFileCallback }">
						<div class="flex flex-col gap-8 pt-4">
							<div v-if="files.length > 0">
								<div class="flex flex-wrap gap-4">
									<div
										v-for="(file, index) in files"
										:key="file.name + file.type + file.size"
										class="p-8 rounded-border flex flex-col border border-surface items-center gap-4"
									>
										<div>
											<img
												role="presentation"
												:alt="file.name"
												:src="file.objectURL"
												width="100"
												height="50"
											/>
										</div>
										<span class="font-semibold text-ellipsis max-w-60 whitespace-nowrap overflow-hidden">{{ file.name }}</span>
										<div>{{ formatSize(file.size) }}</div>
										<Badge
											value="Pending"
											severity="warn"
										/>
										<Button
											icon="pi pi-times"
											@click="onRemoveTemplatingFile(file, removeFileCallback, index)"
											outlined
											rounded
											severity="danger"
										/>
									</div>
								</div>
							</div>

							<div v-if="uploadedFiles.length > 0">
								<div class="flex flex-wrap gap-4">
									<div
										v-for="(file, index) in uploadedFiles"
										:key="file.name + file.type + file.size"
										class="p-8 rounded-border flex flex-col border border-surface items-center gap-4"
									>
										<div>
											<img
												role="presentation"
												:alt="file.name"
												:src="file.objectURL"
												width="100"
												height="50"
											/>
										</div>
										<span class="font-semibold text-ellipsis max-w-60 whitespace-nowrap overflow-hidden">{{ file.name }}</span>
										<div>{{ formatSize(file.size) }}</div>
										<Badge
											value="Completed"
											class="mt-4"
											severity="success"
										/>
										<Button
											icon="pi pi-times"
											@click="removeUploadedFileCallback(index)"
											outlined
											rounded
											severity="danger"
										/>
									</div>
								</div>
							</div>
						</div>
					</template>
					<template #empty>
						<div class="flex items-center justify-center flex-col">
							<i class="pi pi-cloud-upload !border-2 !rounded-full !p-8 !text-4xl" />
							<p class="mt-6 mb-0">拖拽或选择图片进行上传</p>
						</div>
					</template>
				</FileUpload>
			</Dialog>

			<div class="left w-full lg:w-2/5 lg:pl-44 lg:pr-8">
				<img
					@click="changeAvatarVisible = true"
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
				<!-- TODO: 正在学习部分数据过多要加滚动条-->
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
	import FileUpload from 'primevue/fileupload';
	import { ref } from 'vue';
	import { usePrimeVue } from 'primevue/config';
	import { useToast } from 'primevue/usetoast';

	// TODO:user_data需要接口
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
	const changeAvatarVisible = ref(false);

	const $primevue = usePrimeVue();
	const toast = useToast();

	const totalSize = ref(0);
	const totalSizePercent = ref(0);
	const files = ref([]);

	// 移除文件并更新总大小和百分比
	const onRemoveTemplatingFile = (file, removeFileCallback, index) => {
		removeFileCallback(index);
		totalSize.value -= file.size;
		totalSizePercent.value = (totalSize.value / 1000000) * 100; // 以MB为单位
	};

	// 清空上传文件
	const onClearTemplatingUpload = clear => {
		clear();
		totalSize.value = 0;
		totalSizePercent.value = 0;
	};

	// 选择文件时更新总大小
	const onSelectedFiles = event => {
		files.value = event.files;
		totalSize.value = files.value.reduce((sum, file) => sum + file.size, 0);
		totalSizePercent.value = (totalSize.value / 1000000) * 100; // 以MB为单位
	};

	// 上传事件
	const uploadEvent = callback => {
		console.log('开始上传');
		totalSizePercent.value = (totalSize.value / 1000000) * 100; // 以MB为单位
		callback();
	};

	// 文件上传完成后的通知
	const onSuccessUpload = event => {
		console.log('上传成功');
		toast.add({ severity: 'success', summary: 'Success', detail: 'File uploaded successfully!' });
		profileEditFlag.value = true;
	};

	// 格式化文件大小
	const formatSize = bytes => {
		const k = 1024;
		const dm = 2;
		const sizes = $primevue.config.locale.fileSizeTypes;

		if (bytes === 0) {
			return `0 ${sizes[0]}`;
		}

		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return `${(bytes / Math.pow(k, i)).toFixed(dm)} ${sizes[i]}`;
	};
</script>
