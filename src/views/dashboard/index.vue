<template>
	<v-row no-gutters class="px-4">
		<v-col cols="12">
			<TableSearchFilter class="pa-3" @onSearch="searchData">
				<v-col cols="12" sm="4" lg="4">
					<RadioGroup
						v-model="selectedMode"
						row
						:disabled="loading"
						:items="tableTypes"
					/>
				</v-col>

				<v-col cols="12" sm="8" lg="8">
					<v-row class="justify-end no-gutters">
						<v-col cols="12" sm="4" lg="4" class="pa-2 d-flex align-center">
							<span class="mr-2 caption">{{ $t('date.from') }}</span>
							<DatePicker
								v-model="filters.from"
								:nowDate="false"
							/>
						</v-col>

						<v-col cols="12" sm="4" lg="4" class="pa-2 d-flex align-center">
							<span class="mr-2 caption">{{ $t('date.to') }}</span>
							<DatePicker
								v-model="filters.to"
								:nowDate="false"
							/>

							<v-btn
								fab dark small
								color="secondary"
								class="ml-4"
								@click="getData"
							>
								<v-icon>fas fa-check</v-icon>
							</v-btn>
						</v-col>
					</v-row>
				</v-col>
			</TableSearchFilter>

			<TableModule
				:loading="loading"
				:headers="headers"
				:items="items"
				:hasRemoveAction="false"
				:actionEdit="false"
			/>
		</v-col>
	</v-row>
</template>

<script>
import { mapMutations } from 'vuex';
import DashboardService from '@/services/DashboardService';
import RadioGroup from '@/components/RadioGroup.vue';
import TableSearchFilter from '@/components/TableModule/TableSearchFilter.vue';
import TableModule from '@/components/TableModule/index.vue';

const TABLE_KEYS = {
	program: 'program',
	news: 'news'
};

export default {
	name: 'DashboardPage',
	components: {
		RadioGroup,
		TableSearchFilter,
		TableModule,
	},
	data: () => ({
		items: [],
		loading: false,
		filters: {
			from: null,
			to: null,
		},
		selectedMode: TABLE_KEYS.program,
	}),
	computed: {
		tableKeys () {
			return { ...TABLE_KEYS };
		},
		headers () {
			let headerCols = [];
			switch (this.selectedMode) {
				case this.tableKeys.news:
					headerCols = [
						{
							name: this.$i18n.t('common.title'),
							id: 'title',
							sort: false,
							width: '300px',
							align: 'left',
						},
						{
							name: this.$i18n.t('date.date'),
							id: 'createdDate',
							sort: false,
							isDate: true,
							width: '150px',
							align: 'left',
						},
						{
							name: this.$i18n.t('common.description'),
							id: 'description',
							sort: false,
							align: 'left',
						},
						{
							name: this.$i18n.t('common.image'),
							id: 'media',
							isImage: true,
							sort: false,
							width: '120px',
							imageWidth: '120px',
							imageHeight: '80px',
							align: 'center',
						},
					];
					break;
				case this.tableKeys.program:
					headerCols = [
						{
							name: this.$i18n.t('program.columns.programName'),
							id: 'name',
							width: '250px',
							align: 'left',
						},
						{
							name: this.$i18n.t('date.creationDate'),
							id: 'updatedDate',
							width: '150px',
							align: 'center',
							isDate: true,
							sort: true
						},
						{
							name: `${this.$i18n.t('program.columns.price')}`,
							id: 'price',
							width: '150px',
							isCurrency: true,
							align: 'center',
						},
						{
							name: this.$i18n.t('program.columns.certification'),
							id: 'certification',
							width: '120px',
							align: 'center',
						},
						{
							name: this.$i18n.t('program.columns.componentBlock'),
							id: 'blockComponent',
							width: '200px',
							isNumber: true,
							align: 'center',
						}
					];
					break;
				default: throw new Error('selected mode is invalid', this.selectedMode);
			}

			return [...headerCols];
		},
		tableTypes () {
			return [
				{
					id: this.tableKeys.program,
					name: this.$t('dashboard.programs')
				}, {
					id: this.tableKeys.news,
					name: this.$t('route.news.base')
				}
			];
		}
	},
	watch: {
		selectedMode () {
			this.getData();
		},
	},
	methods: {
		...mapMutations(['loadingShow','loadingHide']),
		searchData (items) {
			this.getData(items);
		},
		async getData () {
			this.loadingShow();
			this.loading = true;
			this.items = [];

			const params = {
				...this.filters,
				type: this.selectedMode
			};
			const list = await DashboardService.list(params);

			this.items = list;
			this.loading = false;
			this.loadingHide();
		},
	},
	mounted () {
		this.getData();
	},
};
</script>
