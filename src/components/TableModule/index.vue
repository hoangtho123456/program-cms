<template>
	<div class="relative">
		<div
			v-if="
				Object.keys(services).length &&
				Object.keys(searchItems).length
			"
			class="py-2 d-flex align-center justify-space-between"
		>
			<div class="flex-shrink-1 flex-grow-1 pr-2">
				<TableSearch :items="searchItems" @onSearch="searchDataTable">
					<slot name="table-search"></slot>
				</TableSearch>
			</div>

			<slot name="actions-box"></slot>
		</div>

		<div class="dragscroll" v-dragscroll>
			<v-data-table
				class="table-module"
				:loading="fetchingTable"
				:items-per-page="itemsPerPage === viewAll ? -1 : itemsPerPage"
				:headers="thead"
				:items="columns"
				:class="{
					'table-fixed': tableFixed,
					'disabled-hover': disabledHover,
				}"
				:no-results-text="$t('common.noData')"
				:no-data-text="$t('common.noData')"
				:loading-text="$t('common.processing')"
				:style="{
					'max-height': maxHeight,
					overflow: maxHeight ? 'auto' : 'visible',
				}"
				hide-default-header
				hide-default-footer
			>
				<template v-slot:body.append="{ items }">
					<v-overlay
						v-show="fetchingTable && items.length"
						absolute color="white"
					/>
				</template>

				<!-- FIXME: HEADER -->
				<template v-slot:header="{ props }">
					<thead>
						<tr>
							<th
								v-for="(head, key) in props.headers"
								class="t-head"
								:key="key"
								:style="{ width: head.width || 'auto' }"
							>
								<v-hover v-slot="{ hover }">
									<div
										class="d-flex align-center mb-1 mx-auto"
										:class="[
											head.align === 'left' ? '' : 'justify-center',
										]"
										v-if="head.hasHeaderSlot"
									>
										<slot :name="head.id + 'TH'" />
									</div>
									<div class="px-2" v-else-if="head.search">
										<v-text-field
											placeholder="Sélectionner"
											hide-details="auto"
											outlined
											dense
											dark
											@input="onSearchColumn(arguments[0], head.id)"
										/>
									</div>
									<div
										v-else
										class="d-flex align-center mb-1 relative"
										:class="{
											'justify-center': head.align !== 'left',
											'mx-auto': head.align === 'center',
											'text-left': head.align === 'left',
											'text-right': head.align === 'right',
										}"
									>
										<SortColumn
											v-if="head.sort"
											ref="sortColRefs"
											:keyName="head.id"
											:align="head.align"
											@onChange="(key, asc) => {
												changeSortColumn(key, asc, head);
											}"
										>
											<template v-slot>
												{{ head.name }}
											</template>
										</SortColumn>
										<span v-else>
											{{ head.name }}
										</span>
										<FilterColumn
											v-if="head.filterList"
											:keyName="head.id"
											:items="head.filterList"
											:left="head.filterPositionLeft"
											@onChange="(key, val) => { changeFilterColumn(key, val, head) }"
										/>
										<template v-else-if="head.filterListByKeyword">
											<v-icon size="16" class="ml-2">far fa-search</v-icon>
											<LazySelectInput
												class="filter-keyword"
												:ref="`keywordRef__${key}`"
												:items="head.filterListByKeyword"
												v-show="
													hover ||
													hasKeyword(`keywordRef__${key}`) ||
													filteringByKeyword(`keywordRef__${key}`)"
												hideChips
												@input="($event) => {
													setRefData(`keywordRef__${key}`, $event);
													changeFilterColumn(head.id, $event, head);
												}"
											/>
										</template>
									</div>
								</v-hover>
							</th>
						</tr>
					</thead>
				</template>
	
				<!-- BODY -->
				<template v-slot:item="{ item }">
					<tr>
						<td v-if="colAction" class="t-body px-0">
							<ColAction
								:value="item"
								@onAction="makeAction"
								:hasStatus="actionStatus"
								:edit="actionEdit"
								:editIcon="actionEditIcon"
								:editText="actionEditText"
								:remove="hasRemoveAction"
								:statusKey="actionStatusKey"
							/>
						</td>
						<td
							v-for="(header, key) in headers"
							class="t-body"
							:class="{
								'text-left': header.align === 'left',
								'text-right': header.align === 'right',
								'warning--text': header.highlight,
							}"
							:key="`td_${key}`"
						>
							<slot
								v-if="header.renderSlot"
								:name="header.id"
								v-bind:item="item"
							/>
							<div v-else-if="header.isBoolean">
								<v-icon
									size="20"
									color="success"
									v-if="nested(item, header.id)"
								>
									far fa-check
								</v-icon>
								<v-icon size="20" color="error" v-else>far fa-ban</v-icon>
							</div>
							<div v-else-if="header.id === 'finish'">
								<icon name="active" width="20px" height="20px" />
							</div>
							<div
								v-else-if="
									header.id === 'gender' ||
									header.id === 'user.gender' ||
									header.id === 'profile.user.gender' ||
									header.id === 'prefix'
								"
							>
								{{
									nested(item, header.id) == 1
										? $t('common.female')
										: $t('common.male')
								}}
							</div>
							<div v-else-if="header.isDate">
								{{ nested(item, header.id, 'date') }}
							</div>
							<div v-else-if="header.isHour">
								{{ nested(item, header.id, 'hour') }}
							</div>
							<div v-else :class="{ 'text-left': header.align === 'left' }">
								<v-tooltip bottom v-if="header.externalUrl && nested(item, header.id)">
									<template v-slot:activator="{ on, attrs }">
										<a
											target="_blank"
											:href="getValidUrl(item, header.id)"
											v-bind="attrs"
											v-on="on"
										>
											<v-icon
												size="18"
												:color="
													getValidUrl(item, header.id)
														? 'primary'
														: '#757575'
												"
											>
												{{
													header.externalUrlIcon ||
													'far fa-external-link'
												}}
											</v-icon>
										</a>
									</template>
									<span>{{ getValidUrl(item, header.id) }}</span>
								</v-tooltip>
								<router-link
									v-else-if="header.link"
									:to="parseUrl(item, header.linkKey, header.link)"
									append
								>
									<span
										v-html="itemData(item, header.id, header.truncate)"
									></span>
								</router-link>
								<span v-else-if="header.isNote">
									<ColNote
										:note="nested(item, header.id)"
										icon="fa-comment"
										title="Commentaire"
										@onNote="$emit('onNote', { ...item, note: $event })"
									/>
								</span>
								<span v-else-if="header.isImage">
									<v-img
										class="d-inline-block"
										:class="{ 't-img-circle': header.isImageCircle }"
										:src="getImage(item, header.id)"
										:width="header.imageWidth ? header.imageWidth : 64"
										:height="header.imageHeight ? header.imageHeight : 64"
									/>
								</span>
								<span
									class="pl-2"
									v-else-if="header.listType"
									v-html="
										itemData(
											item,
											header.id,
											header.truncate,
											header.listType
										)
									"
								></span>
								<span v-else-if="header.isDateExpired">
									<v-alert
										v-if="expiredDate(nested(item, header.id))"
										dense
										outlined
										class="mb-0 text-center caption"
										color="error"
										dark
									>
										{{
											$dayjs(nested(item, header.id)).format(
												'DD-MM-YYYY'
											)
										}}
									</v-alert>
									<v-alert
										v-else
										dense
										class="mb-0 text-center caption"
									>
										{{
											$dayjs(nested(item, header.id)).format(
												'DD-MM-YYYY'
											)
										}}
									</v-alert>
								</span>
								<span v-else-if="!!header.mapNameList">
									{{
										getName(header.mapNameList, nested(item, header.id))
									}}
								</span>
								<span v-else-if="header.isCurrency">
									{{ parseCurrency(itemData(item, header.id), ' $') }}
								</span>
								<span v-else-if="header.isNumber">
									{{ parseCurrency(itemData(item, header.id)) }}
								</span>
								<span
									v-else
									v-html="
										itemData(
											item,
											header.id,
											header.truncate,
											null,
											header.suffix,
											header.textNull
										)
									"
									:style="{
										'word-break': header.breakAll
											? 'break-all'
											: 'unset',
										'white-space': header.whiteSpace
											? header.whiteSpace
											: 'normal',
									}"
								></span>
							</div>
						</td>
					</tr>
				</template>
	
				<!-- FOOTER -->
				<template v-slot:foot>
					<tfoot>
						<slot name="footer"></slot>
					</tfoot>
				</template>
			</v-data-table>
		</div>

		<TablePagination
			v-if="pageParams.totalPages > 1"
			class="py-8"
			:limit="itemsPerPage"
			:amount="pageParams.totalItems"
			:totals="pageParams.totalPages"
			@onChangePagination="onChangePagination"
		/>
	</div>
</template>
<script>
import { dragscroll } from 'vue-dragscroll';
import { debounce } from '@/utils';
import trunc from 'trunc-html';
import FilterColumn from './FilterColumn.vue';
import SortColumn from './SortColumn.vue';
import ColNote from './ColNote.vue';
import LazySelectInput from '@/components/LazySelectInput.vue';
import ColAction from './ColAction.vue';
import TablePagination from '@/components/TableModule/Pagination.vue';
import TableSearch from './TableSearchFilter.vue';

export default {
	name: 'TableModule',
	directives: {
		dragscroll,
	},
	props: {
		itemsPerPage: {
			default: 50,
		},
		headers: {
			type: Array,
			default: () => [],
		},
		items: {
			type: Array,
			default: () => [],
		},
		tableFixed: {
			type: Boolean,
			default: true,
		},
		disabledHover: {
			type: Boolean,
			default: false,
		},
		dateFormat: {
			type: String,
			default: 'DD-MM-YYYY',
		},
		maxHeight: {
			type: String,
		},
		colAction: {
			type: Boolean,
			default: false,
		},
		actionEditIcon: {
			type: String,
			default: 'far fa-edit',
		},
		actionEditText: {
			type: String,
			default: '',
		},
		actionStatus: {
			type: Boolean,
			default: false,
		},
		actionStatusKey: {
			type: String,
			default: 'status',
		},
		actionEdit: {
			type: Boolean,
			default: true,
		},
		hasRemoveAction: {
			type: Boolean,
			default: true,
		},
		loading: {
			type: Boolean,
			default: false,
		},
		services: {
			type: Object,
			default: () => ({}),
		},
		searchItems: {
			type: Object,	
			default: () => ({}),
		},
		sortedByAPI: {
			type: Boolean,
			default: false,
		},
		listFuncName: {
			type: String,
			default: 'list'
		},
		propQuery: {
			type: Object,
			default: () => ({
				sort_desc: 'id'
			}),
		},
	},
	components: {
		FilterColumn,
		SortColumn,
		LazySelectInput,
		ColAction,
		ColNote,
		TablePagination,
		TableSearch
	},
	data() {
		return {
			columns: [],
			pageParams: {
				totalPages: 1,
				totalItems: 0,
			},
			fetchingTable: false,
			requestQuery: {},
		};
	},
	computed: {
		thead () {
			let show = [...this.headers];

			if (this.colAction) {
				let wAction = 36;
				show.unshift({ name: '', id: 'colAction', width: wAction + 'px' });
			}

			let tempIndex = -1;
			show.forEach((item) => {
				if (item.sort) {
					item.sortIndex = ++tempIndex;
				}
			});

			return show;
		},
		viewAll () {
			return 'all';
		},
		firstPage () {
			return 1;
		}
	},
	watch: {
		items: {
			immediate: true,
			handler (val) {
				this.columns = !val?.length ? [] : [...val];
			},
		},
		services: {
			immediate: true,
			handler (val) {
				if (Object.keys(val || {}).length) {
					this.updateQuery({ ...this.propQuery })

					this.loadData({
						...this.propQuery,
						page: this.firstPage,
					});
				}
			},
		},
		loading(val) {
			this.fetchingTable = val;
		},
	},
	methods: {
		parseUrl (item, key, path) {
			const url = path || '/';
			return url + (this.nested(item, key) || item.id);
		},
		getValidUrl (item, key) {
			return item[key];
		},
		getImage (item, key) {
			const pic = this.nested(item, key);
			return pic || this.assetsUrl('img/common/no-image-circle.png');
		},
		nested (item, key, time, suffix) {
			try {
				const val = key.split('.').reduce((a, b) => a[b], item);
				const out = val ? val : val === 0 ? 0 : '';
				if (time === 'date') return out ? this.$dayjs(out).format(this.dateFormat) : '';
				if (time === 'hour') return out ? this.$dayjs(out).format('HH:mm') : '';
				if (suffix) return out ? out + suffix : '';
				return out; //get nested prop
			} catch (err) {
				// throw new Error(err);
				return '';
			}
		},
		itemData (item, key, truncate = 0, listType = null, suffix, textNull) {
			if (listType == 'disc' || listType == 'none') {
				const nestedArr = this.nested(item, key) || [];
				let arr = null;
				if (nestedArr.length) {
					if (nestedArr[0].id) {
						arr = nestedArr.map((x) => x.name);
					}
				}
				if (!arr) return '';
				let str = '';
				for (let i in arr) {
					const val = arr[i];
					if (truncate && truncate > 0) {
						const txt = trunc(val, truncate);
						str +=
							(listType === 'disc' ? "<span class='list-dot'>• </span>" : '') +
								txt.html || '';
					} else {
						str +=
							(listType === 'disc' ? "<span class='list-dot'>• </span>" : '') + val;
					}
					str += '<br>';
				}
				return str;
			} else if (truncate && truncate > 0) {
				const txt = trunc(this.nested(item, key), truncate);
				return txt.html || '';
			}
			let out = this.nested(item, key, null, suffix);
			if (textNull && !out) out = textNull;
			return out;
		},
		updateQuery (val) {
			this.requestQuery = {
				...this.requestQuery,
				...val,
			};
		},
		deleteQueryParam (key) {
			if (!key) return false;

			delete this.requestQuery[key];
		},
		onSearchColumn: debounce(function (val, key) {
			this.$emit('onSearchColumn', val, key);
		}, 500),
		changeFilterColumn (key, item, headCol = {}) {
			const keyFilter = key.replace(/.name|.id|.value|.name_display/gi, '');
			const keyList = keyFilter.split('.');
			let tempKey = keyList[keyList.length - 1];

			if (headCol?.constructor !== Object) headCol = {};

			let finalKey = `filter_${tempKey}`;
			if (headCol.searchKey) {
				finalKey = headCol.searchKey;
			}
			let value = item?.id === -1 ? null : (
				item?.id || item?.id == 0 ? `${item.id}` : item
			);

			if (!Object.keys(this.services || {}).length) {
				this.$emit('onChangeFilterColumn', finalKey, value);

				return false;
			}

			if (!value) {
				this.deleteQueryParam(finalKey);
			} else {
				this.updateQuery({ [finalKey]: value });
			}
			this.loadData({page: this.firstPage});
		},
		sortOnlyOneColumn (refs = [], headColumn) {
			if (!refs?.length || !Object.keys(headColumn || {}).length) return false;

			// Remove all sort animation
			// except the one that is clicked
			for (let i = 0; i < refs.length; i++) {
				if (
					i !== headColumn.sortIndex &&
					typeof refs[i]?.isAsc === 'boolean'
				) {
					refs[i].setSort(null);
				}
			}
		},
		changeSortColumn (key, asc = false, head) {
			const vm = this;
			vm.sortOnlyOneColumn(vm.$refs.sortColRefs, head);

			if (this.sortedByAPI) {
				if (Object.keys(this.services || {}).length) {
					asc = !!(asc) ? 'asc' : 'desc';

					// sort only one column on API
					const tempQuery = { ...this.requestQuery };
					for (const key in tempQuery) {
						if (key.startsWith('sorts[')) {
							delete tempQuery[key];
						}
					}
					tempQuery[`sorts[${key}]`] = asc;
					this.requestQuery = { ...tempQuery };
					this.loadData({page: this.firstPage});
				} else {
					this.$emit('changeSortColumn', key, asc);
				}

				return true;
			}

			if (asc) {
				vm.columns = vm.columns.sort((a, b) =>
					vm
						.nested(a, key)
						.toString()
						.localeCompare(vm.nested(b, key).toString(), undefined, {
							numeric: true,
							sensitivity: 'base',
						})
				);
			} else {
				vm.columns = vm.columns.sort((a, b) =>
					vm
						.nested(b, key)
						.toString()
						.localeCompare(vm.nested(a, key).toString(), undefined, {
							numeric: true,
							sensitivity: 'base',
						})
				);
			}
		},
		hasKeyword (refName = '') {
			if (
				!this.$refs[refName]?.[0]?.$el?.getAttribute('data-filter')
			) return false;

      return true;
    },
		filteringByKeyword (refName = '') {
      /**
       * @Note
       * If a filter is being focused,
       * browser will not hide this ref.
       * @Caution
       * If the first child of this ref
       * is not a [v-autocomplete/ v-select],
       * you should check its childrens.
       */
      // console.log(this.$refs[refName]?.[0]?.$children); // test data
      if (!this.$refs[refName]?.[0]?.$children?.[0]?.isMenuActive) return false;

      return true;
    },
		setRefData (refName = '', val) {
			if (!val && (parseInt(val) !== 0)) {
				val = '';
			}

			this.$refs[refName]?.[0]?.$el?.setAttribute('data-filter', val?.toString());
		},
		setPageParams ({
			totalPages,
			total
		}) {
			this.pageParams.totalItems = total || 0;
			this.pageParams.totalPages = totalPages || 1;
		},
		onChangePagination (val) {
			if (!Object.keys(this.services || {}).length) {
				this.$emit('onChangePagination', val);

				return false;
			}

			this.updateQuery({ page: val });
			this.loadData();
		},
		searchDataTable (items) {
			if (!Object.keys(this.services || {}).length) return false;

			const tempQuery = { ...this.requestQuery };

			// add or remove search params on the query
			const tempItems = Object.assign({}, this.searchItems);
			for (const mainKey in tempItems) {
				if (!items[tempItems[mainKey].key]) {
					delete tempQuery[tempItems[mainKey].key];
				} else {
					tempQuery[tempItems[mainKey].key] = items[tempItems[mainKey].key];
				}
			}

			this.requestQuery = { ...tempQuery };
			this.loadData({page: this.firstPage});
		},
		async makeAction (obj = {}) {
			if (!Object.keys(obj || {}).length) return false;

			if (!Object.keys(this.services || {}).length) {
				this.$emit('onAction', obj);
				return false;
			}

			if (obj.type === 'delete') {
				this.fetchingTable = true;
				await this.services.delete(obj.item.id);
				this.loadData({page: this.firstPage});
			} else if (obj.type === 'toggleCheck') {
				this.fetchingTable = true;
				await this.services.validate(obj.item);
				this.loadData({page: this.firstPage});
			} else {
				this.$emit('onAction', obj);
			}
		},
		async loadData (params = {}) {
			this.fetchingTable = true;

			const tempParams = { ...this.requestQuery };
			if (this.itemsPerPage !== this.viewAll) {
				tempParams.limit = this.itemsPerPage;
			} else delete tempParams.limit;

			const query = {
				...tempParams,
				...params
			};

			let arr = [];
			let res = {};
			if (typeof this.services?.[this.listFuncName] === 'function') {
				res = await this.services[this.listFuncName](query);
				if (Object.keys(res || {}).length) {
					arr = !res.list?.length ? [] : [...res.list];
					this.setPageParams(res);
				}
			} else {
				alert('the function [list] is not found@@');
			}
			
			this.$store.commit('SET_TOTAL_NUMBER', res?.total || 0);
			this.columns = [...arr];
			this.fetchingTable = false;
		},
	},
};
</script>
<style lang="scss" scoped>
.filter-keyword {
  position: absolute;
  bottom: -30px;
  background: white;
	z-index: 10;
}
::v-deep {
  .v-select.v-text-field:not(.v-text-field--single-line) {
    input {
      text-overflow: ellipsis;
    }
  }
}
.table-module {
	::v-deep {
		tbody { position: relative; }
	}
}
</style>
