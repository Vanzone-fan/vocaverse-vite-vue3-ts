<template>
	<div class="word-list p-4">
		<DataTable
			:value="words"
		>
			<Column
				field="english"
				header="英文"
			/>
			<Column
				field="chinese"
				header="中文"
			/>
			<Column
				field="partOfSpeech"
				header="词性"
			/>
			<Column
				field="phonetic"
				header="发音"
			/>
		</DataTable>
	</div>
</template>

<script setup>
	import { ref } from 'vue';
	import DataTable from 'primevue/datatable';
	import Column from 'primevue/column';

	const words = ref([

	]);




</script>
