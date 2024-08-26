<template>
	<div class="card">
		<Menubar :model="items">
			<!-- Here's PrimeVue Logo  -->
			<template #start>
				<svg
					width="35"
					height="40"
					viewBox="0 0 35 40"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					class="h-8"
				>
					<path
						d="M25.87 18.05L23.16 17.45L25.27 20.46V29.78L32.49 23.76V13.53L29.18 14.73L25.87 18.04V18.05ZM25.27 35.49L29.18 31.58V27.67L25.27 30.98V35.49ZM20.16 17.14H20.03H20.17H20.16ZM30.1 5.19L34.89 4.81L33.08 12.33L24.1 15.67L30.08 5.2L30.1 5.19ZM5.72 14.74L2.41 13.54V23.77L9.63 29.79V20.47L11.74 17.46L9.03 18.06L5.72 14.75V14.74ZM9.63 30.98L5.72 27.67V31.58L9.63 35.49V30.98ZM4.8 5.2L10.78 15.67L1.81 12.33L0 4.81L4.79 5.19L4.8 5.2ZM24.37 21.05V34.59L22.56 37.29L20.46 39.4H14.44L12.34 37.29L10.53 34.59V21.05L12.42 18.23L17.45 26.8L22.48 18.23L24.37 21.05ZM22.85 0L22.57 0.69L17.45 13.08L12.33 0.69L12.05 0H22.85Z"
						fill="var(--p-primary-color)"
					/>
					<path
						d="M30.69 4.21L24.37 4.81L22.57 0.69L22.86 0H26.48L30.69 4.21ZM23.75 5.67L22.66 3.08L18.05 14.24V17.14H19.7H20.03H20.16H20.2L24.1 15.7L30.11 5.19L23.75 5.67ZM4.21002 4.21L10.53 4.81L12.33 0.69L12.05 0H8.43002L4.22002 4.21H4.21002ZM21.9 17.4L20.6 18.2H14.3L13 17.4L12.4 18.2L12.42 18.23L17.45 26.8L22.48 18.23L22.5 18.2L21.9 17.4ZM4.79002 5.19L10.8 15.7L14.7 17.14H14.74H15.2H16.85V14.24L12.24 3.09L11.15 5.68L4.79002 5.2V5.19Z"
						fill="var(--p-text-color)"
					/>
				</svg>
			</template>
			<template #item="{ item, props, hasSubmenu, root }">
				<router-link
					v-if="item.route"
					v-slot="{ href, navigate }"
					:to="item.route"
					custom
				>
					<a
						v-ripple
						:href="href"
						v-bind="props.action"
						@click="navigate"
					>
						<span :class="item.icon" />
						<span class="ml-2">{{ item.label }}</span>
						<Badge
							v-if="item.badge"
							:class="{ 'ml-auto': !root, 'ml-2': root }"
							:value="item.badge"
						/>
						<span
							v-if="hasSubmenu"
							class="pi pi-fw pi-angle-down ml-2"
						/>
					</a>
				</router-link>
				<a
					v-else
					v-ripple
					:href="item.url"
					:target="item.target"
					v-bind="props.action"
				>
					<span :class="item.icon" />
					<span class="ml-2">{{ item.label }}</span
					><Badge
						v-if="item.badge"
						:class="{ 'ml-auto': !root, 'ml-2': root }"
						:value="item.badge"
					/>
					<span
						v-if="hasSubmenu"
						class="pi pi-fw pi-angle-down ml-2"
					/>
				</a>
			</template>
			<template #end>
				<div class="flex items-center gap-2">
					<div class="relative">
						<i
							class="pi pi-search absolute right-2 top-[50%] translate-y-[-50%]"
						></i>
						<InputText
							placeholder="CTRL+K"
							type="text"
							class="pl-8 w-32 sm:w-auto"
							@click="toggleWordsList"
						/>
					</div>
					<Avatar
						:image="avatar"
						shape="circle"
						aria-haspopup="true"
						aria-controls="user-menu"
						@click="toggleUserOptions"
					/>
					<Menu
						ref="user_menu"
						id="user-menu"
						:model="user_options"
						:popup="true"
						@command="handleMenuItems"
						><template #item="{ item, props }">
							<router-link
								v-if="item.route"
								v-slot="{ href, navigate }"
								:to="item.route"
								custom
							>
								<a
									v-ripple
									:href="href"
									v-bind="props.action"
									@click="navigate"
								>
									<span :class="item.icon" />
									<span class="ml-2">{{ item.label }}</span>
								</a>
							</router-link>
							<a
								v-else
								v-ripple
								:href="item.url"
								:target="item.target"
								v-bind="props.action"
							>
								<span :class="item.icon" />
								<span class="ml-2">{{ item.label }}</span>
							</a>
						</template>
					</Menu>
				</div>
			</template>
		</Menubar>
		<DynamicDialog />
	</div>
</template>

<script setup>
	import { ref, onMounted, onBeforeUnmount } from 'vue';
	import DynamicDialog from 'primevue/dynamicdialog';
	import Menubar from 'primevue/menubar';
	import { useDialog } from 'primevue/useDialog';
	import wordsList from './WordsList.vue';

	const items = ref([
		{ label: '首页', icon: 'pi pi-home', route: '/home' },
		{ label: '单词记忆', icon: 'pi pi-bolt' },
		{ label: '短文学习', icon: 'pi pi-graduation-cap' },
		{ label: '频道活动', icon: 'pi pi-envelope', badge: 3 },
		{ label: '联系客服', icon: 'pi pi-link', route: '/contact' },
		{
			label: '技术支持',
			icon: 'pi pi-sparkles',
			items: [
				{ label: 'Vue', url: 'https://vuejs.org/' },
				{ label: 'Vite', url: 'https://vitejs.dev/' },
				{ label: 'Pinia', url: 'https://pinia.vuejs.org/' },
				{ label: 'Axios', url: 'https://axios-http.com/' },
				{ label: 'Prime Vue', url: 'https://primevue.org/' },
			],
		},
	]);

	const avatar = ref(
		'https://cdn.pixabay.com/photo/2024/02/24/00/05/concert-hall-8593024_1280.jpg',
	);
	const user_menu = ref();
	const user_options = ref([
		{
			label: 'Options',
			items: [
				{
					label: 'Edit Profile',
					icon: 'pi pi-pencil',
					route: '/profile',
				},
				{
					label: 'Change Password',
					icon: 'pi pi-cog',
					command: () => {
						console.log('change password');
					},
				},
				{
					label: 'Log out',
					icon: 'pi pi-sign-out',
					command: () => {
						localStorage.removeItem('authToken');
						location.reload();
					},
				},
			],
		},
	]);
	const toggleUserOptions = event => {
		user_menu.value.toggle(event);
	};
	const handleMenuItems = event => {
		console.log(event.item);
	};

	const dialog = useDialog();
	const dialogActive = ref(false);
	let dialogRef = null;

	const toggleWordsList = () => {
		if (dialogActive.value) {
			closeWordsList();
		} else {
			// TODO:第一次点击正常 关闭dialog后再次点击无效 必须双击才能正常运行
			console.log('click trigger');
			showWordsList();
		}
	};

	const showWordsList = () => {
		dialogRef = dialog.open(wordsList, {
			props: {
				header: '单词列表',
				style: { width: '30vw' },
				breakpoints: { '960px': '75vw', '640px': '90vw' },
				modal: true,
				dismissableMask: true,
			},
		});
		dialogActive.value = true;
	};

	const closeWordsList = () => {
		if (dialogRef) {
			dialogRef.close();
			dialogActive.value = false;
		}
	};

	const handleSearchKeyDown = event => {
		if (event.ctrlKey && event.key === 'k') {
			event.preventDefault();
			toggleWordsList();
		}
	};

	const manageKeyEvent = action => {
		window[action]('keydown', handleSearchKeyDown);
	};

	onMounted(() => manageKeyEvent('addEventListener'));
	onBeforeUnmount(() => manageKeyEvent('removeEventListener'));
</script>
