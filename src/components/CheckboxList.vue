<template>
	<div
		:class="{
			flex: row,
			'gap-4': true,
			'items-center': true,
			'error-list': rules && rules.length
		}"
	>
		<div v-if="label" class="mt-3">{{ label }}</div>
		<v-checkbox
			v-model="entity"
			v-for="(v, k) in list"
			:key="k"
			:label="v.name"
			:value="v.id"
			:multiple="multiple"
			class="pt-0 mt-3"
			hide-details="auto"
			:rules="rules"
		></v-checkbox>
	</div>
</template>
<script>
export default {
	props: {
		multiple: {
			type: Boolean,
			default: true,
		},
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
		value(val) {
			if (this.once) {
				this.entity = val;
				this.once = false;
			}
		},
		entity(val) {
			this.$emit('input', val);
		},
	},
};
</script>
<style lang="scss" scoped>
.error-list {
	&>.error--text:not(:last-child) {
		::v-deep {
			.v-messages.error--text {
				display: none;
			}
		}
	}
}
</style>
