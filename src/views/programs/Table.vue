<template>
	<div class="px-0 mb-12">
		<TableModule
			class="px-4"
			:loading="loading"
			:services="entityServices"
			:itemsPerPage="mixinQuery.limit"
			:headers="headers"
			:searchItems="filterItems"
			actionEdit
			colAction
			@onAction="onAction"
		>
			<template v-slot:actions-box>
				<v-btn
					class="bg-gradient-to-r from-green-500 to-orange-500"
					depressed dark
					@click="createProgram"
				>
					<v-icon left>fas fa-plus</v-icon>
					{{ $t('program.addProgram') }}
				</v-btn>
			</template>
			<template v-slot:programCategory="{ item }">
				<div v-if="item.programCategory">
					{{ item.programCategory.name }}
				</div>
			</template>
		</TableModule>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import i18n from '@/locale';
import {
  BOOLEAN_TYPES,
  LANGUAGES,
  FORMAT_LIST
} from '@/utils/constant';
import mixinRequest from '@/mixins/requestQuery';
import routesNames from "@/router/routesNames";
import ProgramService from '@/services/ProgramService';
import TableSearchFilter from '@/components/TableModule/TableSearchFilter.vue';
import TableModule from '@/components/TableModule/index.vue';
import TablePagination from '@/components/TableModule/Pagination.vue';

declare module 'vue/types/vue' {
  interface Vue {
    mixinQuery: Objects.IRequestQuery
  }
}

export default Vue.extend({
	name: 'Table',
	mixins: [mixinRequest],
	components: {
		TableSearchFilter,
		TableModule,
		TablePagination,
	},
	data: () => ({
		filterItems: {
			name: {
				key: 'filter_name_like',
				name: 'program.columns.programName',
				col: 4,
			},
		},
		columns: [],
		loading: false,
	}),
	computed: {
		headers(): object[] {
			return [
				{
					name: i18n.t('program.columns.programName'),
					id: 'name',
					width: '300px',
					align: 'left',
				},
				{
					name: i18n.t('program.category'),
					id: 'programCategory',
					width: '200px',
					filterListByKeyword: this.programCates,
					renderSlot: true,
					align: 'left',
				},
				{
					name: i18n.t('date.creationDate'),
					id: 'updatedDate',
					width: '150px',
					align: 'center',
					isDate: true,
					sort: true
				},
				{
					name: i18n.t('program.columns.duration'),
					id: 'hour',
					width: '130px',
					isNumber: true,
					align: 'center',
				},
				{
					name: `${i18n.t('program.columns.price')}`,
					id: 'price',
					width: '130px',
					isCurrency: true,
					align: 'center',
				},
				{
					name: i18n.t('program.columns.format'),
					id: 'format',
					width: '150px',
					filterListByKeyword: this.formats,
					mapNameList: this.formats,
					align: 'center',
					searchKey: 'member_format'
				},
				{
					name: i18n.t('program.columns.language'),
					id: 'language',
					width: '150px',
					filterList: this.languages,
					mapNameList: this.languages,
					align: 'center',
					searchKey: 'member_language'
				},
				{
					name: i18n.t('common.boolean'),
					id: 'bool',
					width: '120px',
					filterList: this.booleanTypes,
					mapNameList: this.booleanTypes,
					align: 'center',
				},
				{
					name: i18n.t('program.columns.certification'),
					id: 'certification',
					width: '120px',
					align: 'left',
				},
				{
					name: i18n.t('program.columns.componentBlock'),
					id: 'blockComponent',
					width: '200px',
					isNumber: true,
					align: 'center',
				}
			];
		},
		booleanTypes (): BooleanType[] {
			return [...BOOLEAN_TYPES];
		},
		languages (): LangType[] {
			return [...LANGUAGES];
		},
		formats (): any[] {
      return [...FORMAT_LIST];
		},
		programCates (): any[] {
			return this.$store.getters.getList('programCateList');
		},
		entityServices (): object {
			return ProgramService;
		},
	},
	methods: {
		createProgram (): void {
			this.$router.push({
				name: routesNames.program.add
			});
		},
		async onAction(obj: { type: string, item: any }): Promise<void> {
			if (obj.type === 'edit') {
				this.$router.push({
					name: routesNames.program.edit,
					params: { id: obj.item.id }
				});
			}
		},
	},
});
</script>
