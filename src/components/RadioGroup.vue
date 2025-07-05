<template>
	<div v-if="list.length">
		<div v-if="label" class="pt-1 mb-3">{{ label }}</div>
		<v-radio-group
			v-model="entity"
			:column="!row"
			:row="row"
			:disabled="disabled"
			:rules="rules"
			hide-details="auto"
		>
			<v-radio
				v-for="(v, k) in list"
				:key="k"
				:label="v.name"
				:value="v.id"
			></v-radio>
		</v-radio-group>
	</div>
</template>
<script>
export default {
	props: {
		label: {
			type: String,
			default: '',
		},
		row: {
			type: Boolean,
			default: false,
		},
		items: {
			type: Array,
			default: () => [],
		},
		rules: {
			type: Array,
			default: () => [],
		},
		loader: {
			type: Function,
		},
		value: {},
		disabled: {
			type: Boolean,
			default: false,
		}
	},
	data: () => ({
		once: true,
		entity: null,
	}),
	computed: {
		list() {
			if (!this.loader) {
				return this.items;
			} else {
				return this.loader();
			}
		},
	},
	watch: {
		value: {
			immediate: true,
			handler(val) {
				if (this.once && (val || val == 0)) {
					this.entity = val;
					this.once = false;
				}
			},
		},
		entity(val) {
			this.$emit('input', val);
		},
	},
};
</script>
