<template>
	<div class="multi-auto-search">
		<v-autocomplete
			v-model="selected"
			:search-input.sync="search"
			:items="list"
			:item-text="itemText"
			:item-value="itemValue"
			outlined
			dense
			:clearable="!disabled"
			:placeholder="$t('common.select')"
			:return-object="returnObject"
			:hide-details="hideDetails"
			:rules="rules"
			:attach="attach"
			:no-data-text="loading ? $t('common.loading') : $t('common.noData')"
			:loading="loading"
			:disabled="disabled"
			:dark="dark"
		>
			<template v-slot:prepend-item v-if="addItem">
				<v-text-field
					v-model="addModel"
					:loading="addLoader"
					class="input-add-custom"
					dense
					outlined
					:placeholder="placeholderAdd"
					hide-details="auto"
				>
					<v-btn @click="onAdd" slot="append" color="primary" icon :disabled="addLoader">
						<v-icon size="18">far fa-plus</v-icon>
					</v-btn>
				</v-text-field>
			</template>
			<template v-slot:append-item>
				<div class="text-center" v-intersect="endIntersect" v-show="page <= totalPages">
					<v-progress-circular indeterminate color="primary"></v-progress-circular>
				</div>
			</template>
		</v-autocomplete>
	</div>
</template>
<script>
import { mergeByKey, groupBy, sleep } from '@/utils';
export default {
	name: 'LazySelectInput',
	props: {
		value: {},
		groupBy: {
			type: String,
			default: '',
		},
		itemValue: {
			type: String,
			default: 'id',
		},
		itemText: {
			type: String,
			default: 'name',
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		dark: {
			type: Boolean,
			default: false,
		},
		hideChips: {
			type: Boolean,
			default: false,
		},
		attach: {
			type: Boolean,
			default: false,
		},
		returnObject: {
			type: Boolean,
			default: false,
		},
		rules: {
			type: Array,
			default: () => [],
		},
		placeholderAdd: {
			type: String,
			default: 'Ajouter',
		},
		hideDetails: {
			default: 'auto',
		},
		items: {
			type: Array,
			default: () => [],
		},
		loader: { type: Function },
		addItem: { type: Function, default: null },
	},
	data() {
		return {
			once: false,
			loading: false,
			addLoader: false,
			addModel: null,
			selected: null,
			search: null,
			list: [],
			page: 1,
			totalPages: 1,
			limit: 20,
			sort_desc: 'id',
		};
	},
	computed: {
		selectedGroup() {
			if (!this.selected) return null;
			const list = groupBy(this.selected, (x) => x.level.name);
			return list;
		},
	},
	watch: {
		value: {
			immediate: true,
			handler(val) {
				if (val && this.list.length === 0) {
					if (val[this.itemValue]) {
						this.list = [val];
					} else {
						const item = {};
						item[this.itemValue] = val;
						this.list = [item];
					}
				}
				this.selected = val;
			},
		},
		selected(val) {
			this.$emit('input', val);
		},
		async search() {
			this.page = 1;
			await this.onData();
		},
		items: {
			immediate: true,
			handler (val) {
				if (!this.loader) {
					this.list = !val?.length ? [] : [...val];
					this.totalPages = 0;
				}
			}
		},
	},
	methods: {
		async endIntersect(entries, observer, isIntersecting) {
			if (isIntersecting) {
				if (this.loader) await this.onData();
			}
		},
		async onData() {
			if (!this.loader) {
				this.list = [...this.items];
				this.totalPages = 0;
				return;
			}
			this.loading = true;
			const query = {
				page: this.page,
				limit: this.limit,
				sort_desc: this.sort_desc,
			};
			if (this.search && this.search != '[object Object]') query['name[like]'] = this.search;
			const res = await this.loader(query);
			if (res) {
				const result = res.list || res;
				const list = mergeByKey(this.list, result, this.itemValue);
				this.list = list.sort((a, b) => b.id - a.id);
				this.page = res.currentPage ? ++res.currentPage : 1;
				this.totalPages = res.pagination?.total_pages ? res.pagination?.total_pages : 0;
			}
			this.loading = false;
		},
		onRemove(i) {
			this.selected = this.selected.filter((x) => x !== i);
		},
		async onAdd() {
			if (this.addModel) {
				this.addLoader = true;
				await this.addItem({ name: this.addModel });
				this.addModel = null;
				this.addLoader = false;
				//reload
				this.page = 1;
				await this.onData();
			}
		},
	},
};
</script>
<style lang="scss">
.input-add-custom {
	margin: 8px 16px !important;
	.v-input__slot {
		padding-right: 4px !important;
		.v-input__append-inner {
			margin-top: 2px !important;
		}
	}
}
</style>
