<template>
	<div class="px-0 mb-12">
		<div class="pa-2 d-flex align-center justify-space-between">
			<div class="flex-grow-1">
				<TableSearchFilter :items="filterItems" @onSearch="onSearch" />
			</div>
			<div class="flex-shrink-0 px-2">
				<v-btn
					depressed dark
					color="primary"
					:to="{ name: routesNames.news.add }"
				>
					<v-icon left>fas fa-plus</v-icon>
					{{ $t('common.add') }} {{ $t('route.news.aNews') }}
				</v-btn>
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
			@onAction="makeAction"
			@onChangePagination="onChangePagination"
		/>
	</div>
</template>

<script>
import i18n from '@/locale';
import routesNames from "@/router/routesNames";
import NewsService from '@/services/NewsService';
import mixinRequest from '@/mixins/requestQuery';
import TableSearchFilter from '@/components/TableModule/TableSearchFilter.vue';
import TableModule from '@/components/TableModule/index.vue';
import TablePagination from '@/components/TableModule/Pagination.vue';

export default {
	mixins: [mixinRequest],
	components: {
		TableSearchFilter,
		TableModule,
		TablePagination,
	},
	data: () => ({
		search: {},
		filterItems: {
			name: {
				key: 'filter_title_like',
				name: 'common.title',
				col: 4,
			},
		},
		columns: [],
		loading: false,
	}),
	computed: {
		headers() {
			return [
				{
					name: i18n.t('date.date'),
					id: 'createdDate',
					sort: false,
					width: '85px',
					isDate: true,
					align: 'left',
				},
				{
					name: i18n.t('common.title'),
					id: 'title',
					sort: false,
					width: '150px',
					align: 'left',
				},
				{
					name: i18n.t('common.description'),
					id: 'description',
					sort: false,
					width: '300px',
					align: 'left',
				},
				{
					name: i18n.t('common.image'),
					id: 'media',
					isImage: true,
					sort: false,
					width: '120px',
					imageWidth: '120px',
					imageHeight: '80px',
					align: 'center',
				},
			];
		},
		routesNames () {
			return { ...routesNames }
		}
	},
	methods: {
		onSearch(items) {
			this.updateApiQuery({ ...items });
			this.getData();
		},
		onChangePagination(val) {
			this.updateApiQuery({ page: val });
			this.getData();
		},
		async makeAction(obj) {
			if (obj.type === 'edit') {
				this.$router.push({ name: 'NewsEdit', params: { id: obj.item.id } });
			} else if (obj.type === 'delete') {
				await NewsService.delete(obj.item.id);
				this.getData();
			} else if (obj.type === 'toggleCheck') {
				await NewsService.toggleStatus(obj.item);
				this.getData();
			}
		},
		async getData() {
			this.loading = true;

			const query = this.mixinQuery;
			const res = await NewsService.list(query);
			if (res) {
				this.columns = res.list;
				this.$refs.tableRef?.setPageParams(res);
			}
			this.$store.commit('SET_TOTAL_NUMBER', res?.total || 0);
			this.loading = false;
		},
	},
	mounted() {
		this.getData();
	},
};
</script>
