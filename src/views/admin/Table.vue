<template>
	<div class="px-0 mb-12">
		<div class="pa-2 d-flex align-center justify-space-between">
			<div class="flex-grow-1">
				<TableSearchFilter :items="searchItems" @onSearch="onSearch" />
			</div>
			<div class="flex-shrink-0 px-2">
				<v-btn
					depressed
					color="primary"
					to="/admin/add"
				>
					<v-icon left>fas fa-plus</v-icon>
					{{ $t('route.admin.addAdmin') }}
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
			@onAction="onAction"
			@onChangeFilterColumn="onChangeFilterColumn"
			@onChangePagination="onChangePagination"
		>
			<template v-slot:fullName="{ item }">
				<div class="caption">{{ item.firstName }} {{ item.lastName }}</div>
			</template>
		</TableModule>
	</div>
</template>

<script>
import i18n from '@/locale';
import UserService from '@/services/UserService.js';
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
		searchItems: {
			nameFull: {
				key: 'filter_namefull_like',
				name: 'common.fullName',
				col: 4,
			},
			email: {
				key: 'filter_email_like',
				name: 'common.emailLogin',
				col: 4,
			},
		},
		columns: [],
		page: 1,
		limit: 50,
		sortByKey: 'id',
		loading: false,
		speakerList: [],
		specialityList: [],
		locationList: [],
	}),
	computed: {
		headers() {
			return [
				{
					name: i18n.t('date.creationDate'),
					id: 'createdDate',
					sort: false,
					width: '110px',
					isDate: true,
					align: 'left',
				},
				{
					name: i18n.t('common.fullName'),
					id: 'fullName',
					renderSlot: true,
					sort: false,
					width: '120px',
					align: 'left',
				},
				{
					name: i18n.t('common.emailLogin'),
					id: 'email',
					sort: false,
					width: '280px',
					breakAll: true,
					align: 'left',
				},
				{
					name: i18n.t('route.admin.roles'),
					id: 'subRoles',
					filterList: this.userRoles,
					listType: 'disc',
					searchKey: 'filter_roles',
					width: '140px',
					align: 'left',
				},
			];
		},
		userRoles() {
			return this.$store.getters.getList('userRoles');
		},
	},
	methods: {
		onSearch(items) {
			this.updateApiQuery({ ...items });
			this.getData();
		},
		onChangePagination (val) {
			this.updateApiQuery({ page: val });
			this.getData();
		},
		onChangeFilterColumn (key, val) {
			if (!val) {
				this.deleteQueryParam(key);
			} else {
				this.updateApiQuery({ [key]: val });
			}
			this.getData();
		},
		async onAction(obj) {
			if (obj.type === 'edit') {
				this.$router.push(`/admin/${obj.item.id}`);
			} else if (obj.type === 'delete') {
				await UserService.delete(obj.item.id);
				this.getData();
			} else if (obj.type === 'toggleCheck') {
				await UserService.toggleStatus(obj.item);
				this.getData();
			}
		},
		async getData () {
			this.loading = true;
			const query = this.mixinQuery;
			const res = await UserService.list(query);
			if (res) {
				this.columns = res.list;
				this.$refs.tableRef?.setPageParams(res);
			}
			this.loading = false;
		},
	},
	mounted() {
		this.getData();
	},
};
</script>
