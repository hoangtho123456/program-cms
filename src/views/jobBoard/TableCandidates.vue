<template>
	<div class="px-0 mb-12">
		<div class="pa-2 d-flex align-center justify-space-between">
			<div class="flex-grow-1">
				<TableSearchFilter :items="filterItems" @onSearch="onSearch" />
			</div>
			<div class="flex-shrink-0 px-2">
				<v-tooltip top>
					<template v-slot:activator="{ on, attrs }">
						<v-btn
							@click="exportExcel"
							v-bind="attrs"
							v-on="on"
							fab
							dark
							small
							class="bg-gradient-to-r from-red-500 to-orange-500 ml-4"
						>
							<v-icon dark size="18">fa-solid fa-file-arrow-down</v-icon>
						</v-btn>
					</template>
					<span>{{ $t('common.export') }}</span>
				</v-tooltip>
			</div>
		</div>

		<TableModule
			ref="tableRef"
			class="px-4"
			:itemsPerPage="mixinQuery.limit"
			:loading="loading"
			:headers="headers"
			:items="columns"
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
import routesNames from "@/router/routesNames";
import JobCandidateService from '@/services/JobCandidateService.js';
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
			firstName: {
				key: 'filter_firstName_like',
				name: 'common.firstName',
				col: 3,
			},
			lastName: {
				key: 'filter_lastName_like',
				name: 'common.lastName',
				col: 3,
			},
			email: {
				key: 'filter_email_like',
				name: 'common.email',
				col: 3,
			},
		},
		columns: [],
		loading: false,
	}),
	computed: {
		headers(): Record<string, any>[] {
			return [
				{
					name: i18n.t('date.applicationDate'),
					id: 'createdDate',
					isDate: true,
					sort: true,
					width: '150px',
					align: 'center',
				},
				{
					name: i18n.t('common.firstName'),
					id: 'firstName',
					sort: false,
					width: '90px',
					align: 'left',
				},
				{
					name: i18n.t('common.lastName'),
					id: 'lastName',
					sort: false,
					width: '90px',
					align: 'left',
				},
				{
					name: i18n.t('common.sex'),
					id: 'gender',
					sort: false,
					width: '60px',
					align: 'center',
				},
				{
					name: i18n.t('common.email'),
					id: 'email',
					sort: false,
					width: '180px',
					align: 'left',
				},
				{
					name: i18n.t('common.telephone'),
					id: 'phone',
					sort: false,
					width: '140px',
					align: 'left',
				},
				{
					name: i18n.t('common.message'),
					id: 'message',
					isNote: true,
					sort: false,
					width: '100px',
					align: 'center',
				},
			];
		},
	},
	methods: {
		onSearch(items: Record<string, any>): void {
			this.updateApiQuery({ ...items });
			this.getData();
		},
		onChangePagination (val: number): void {
			this.updateApiQuery({ page: val });
			this.getData();
		},
		async onAction(obj: Record<string, any>): Promise<void> {
			if (obj.type === 'edit') {
				this.$router.push({ name: routesNames.jobBoard.editCandidate, params: { id: obj.item.id } });
			} else if (obj.type === 'delete') {
				await JobCandidateService.delete(obj.item.id);
				this.getData();
			} else if (obj.type === 'toggleCheck') {
				await JobCandidateService.validate(obj.item);
				this.getData();
			}
		},
		async getData() {
			this.loading = true;
			const query = this.mixinQuery;
			const res = await JobCandidateService.list(query);
			this.columns = res.list;

			const tableRef = this.$refs.tableRef as TableInstance;
			tableRef?.setPageParams(res);
			this.$store.commit('SET_TOTAL_NUMBER', res?.total || 0);
			this.loading = false;
		},
		exportExcel() {
			this.$store.commit('appSnackbar/showSuccessBox', {
				message: this.$t('common.success')
			});
		},
	},
	async mounted() {
		this.getData();
	},
});
</script>
