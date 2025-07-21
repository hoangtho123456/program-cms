<template>
	<div class="px-0 mb-12">
		<div class="pa-2 d-flex align-center justify-space-between">
			<div class="flex-grow-1">
				<TableSearchFilter :items="filterItems" @onSearch="onSearch" />
			</div>
		</div>

		<TableModule
			ref="tableRef"
			class="px-4"
			:itemsPerPage="mixinQuery.limit"
			:loading="loading"
			:headers="headers"
			:items="columns"
			actionStatus
			colAction
			@onAction="onAction"
			@onChangePagination="onChangePagination"
		/>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import i18n from '@/locale';
import mixinRequest from '@/mixins/requestQuery';
import OfferService from '@/services/OfferService';
import TableSearchFilter from '@/components/TableModule/TableSearchFilter.vue';
import TableModule from '@/components/TableModule/index.vue';
import TablePagination from '@/components/TableModule/Pagination.vue';

interface TableInstance extends Vue {
	setPageParams(res: Record<string, any>): void;
}

export default Vue.extend({
	mixins: [mixinRequest],
	components: {
		TableSearchFilter,
		TableModule,
		TablePagination,
	},
	data: () => ({
		filterItems: {
			postTitle: {
				key: 'filter_postTitle_like',
				name: 'common.postTitle',
				col: 3,
			},
			companyName: {
				key: 'filter_companyName_like',
				name: 'common.companyName',
				col: 3,
			},
		},
		columns: [] as Record<string, any>[],
		loading: false,
	}),
	computed: {
		headers(): Record<string, any>[] {
			return [
				{
					name: i18n.t('common.reference'),
					id: 'code',
					highlight: true,
					sort: false,
					width: '70px',
					align: 'left',
				},
				{
					name: i18n.t('common.postTitle'),
					id: 'postTitle',
					highlight: true,
					sort: false,
					width: '160px',
					align: 'left',
				},
				{
					name: i18n.t('common.companyName'),
					id: 'companyName',
					sort: false,
					width: '160px',
					align: 'left',
				},
				{
					name: i18n.t('program.columns.format'),
					id: 'format',
					sort: false,
					width: '140px',
					align: 'left',
				},
				{
					name: i18n.t('common.email'),
					id: 'email',
					sort: false,
					width: '180px',
					align: 'left',
				},
			];
		},
	},
	methods: {
		onSearch(items: Record<string, any>): void {
			this.updateApiQuery({ ...items });
			this.getData();
		},
		onChangePagination(val: number): void {
			this.updateApiQuery({ page: val });
			this.getData();
		},
		async onAction(obj: Record<string, any>): Promise<void> {
			if (obj.type === 'edit') {
				this.$router.push({ name: 'JobBoardEdit', params: { id: obj.item.id } });
			} else if (obj.type === 'delete') {
				this.loading = true;
				await OfferService.delete(obj.item.id);
				this.getData();
			} else if (obj.type === 'toggleCheck') {
				this.loading = true;
				await OfferService.toggleStatus(obj.item);
				this.getData();
			}
		},
		async getData() {
			this.loading = true;
			const query = this.mixinQuery;
			const res = await OfferService.list(query);
			if (res) {
				this.columns = res.list;
				const tableRef = this.$refs.tableRef as TableInstance;
				tableRef?.setPageParams(res);
			}
			this.loading = false;
		},
	},
	mounted() {
		this.getData();
	},
});
</script>
