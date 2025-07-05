<template>
	<div>
		<v-autocomplete
			v-model="selected"
			:items="items"
			:item-text="itemText"
			:item-value="itemValue"
			multiple
			outlined
			dense
			attach
			return-object
			no-data-text="Pas de résultat disponible !"
			:rules="rules"
		>
			<template v-slot:selection="{ index }">
				<template v-if="index === 0">
					{{ selected.length }} {{ $t('common.item') }}(s)
				</template>
			</template>
			<template v-slot:prepend-item v-if="selectAll">
				<v-list-item ripple @click="toggle" class="px-4 border-b">
					<v-list-item-action>
						<v-icon>{{ icon }}</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title>
							{{ $t('common.selectAll') }}
						</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</template>
		</v-autocomplete>
		<div class="bg-gray-100">
			<v-chip
				v-for="(v, k) in selected"
				:key="k"
				class="ma-2 text-sm"
				color="transparent"
				text-color="black"
			>
				<v-icon color="red" left size="13" class="ml-1 mr-2" @click="onRemove(v)">
					fal fa-times
				</v-icon>
				{{ truncateText(v[itemText], 40) }}
			</v-chip>
		</div>
	</div>
</template>
<script>
export default {
	name: 'MultiAutocomplete',
	props: {
		value: {},
		itemValue: {
			type: String,
			default: 'id',
		},
		itemText: {
			type: String,
			default: 'name',
		},
		items: {
			type: Array,
			default: () => [],
		},
		rules: {
			type: Array,
			default: () => [],
		},
		selectAll: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			selected: null,
		};
	},
	computed: {
		pickAll() {
			return this.selected && this.selected.length === this.items.length;
		},
		icon() {
			if (this.pickAll) return 'far fa-check-square';
			return 'far fa-square';
		},
	},
	watch: {
		value: {
			immediate: true,
			handler(val) {
				this.selected = val;
			},
		},
		selected(val) {
			this.$emit('input', val);
		},
	},
	methods: {
		onRemove(i) {
			this.selected = this.selected.filter((x) => x !== i);
		},
		toggle() {
			if (this.pickAll) {
				this.selected = [];
			} else {
				this.selected = this.items.slice();
			}
		},
	},
};
</script>
