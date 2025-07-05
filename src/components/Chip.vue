<template>
	<div>
		<div class="caption text-gray-500">
			<template v-if="value">
				( {{ value.length }} {{ $t('route.jobBoard.captionSkills') }} )
			</template>
		</div>
		<v-chip-group v-model="entity" :multiple="multiple" active-class="primary" column>
			<v-chip v-for="(v, k) in list" :key="k" :value="v.id">
				{{ v.name }}
			</v-chip>
		</v-chip-group>
		<div class="text-center">
			<v-btn text color="primary" @click="more = !more">
				{{ $t('common.seeMore') }}
				<i v-if="more" class="fas fa-arrow-up ml-2"></i>
				<i v-else class="fas fa-arrow-down ml-2"></i>
			</v-btn>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		multiple: {
			type: Boolean,
			default: false,
		},
		items: {
			type: Array,
			default: () => [],
		},
		loader: {
			type: Function,
		},
		value: {},
		limit: {
			type: Number,
			default: 5,
		},
		limitShow: {
			type: Number,
			default: 36,
		},
	},
	data: () => ({
		once: true,
		entity: null,
		more: false,
	}),
	computed: {
		records() {
			if (!this.loader) {
				return this.items;
			} else {
				return this.loader();
			}
		},
		list() {
			if (this.more) {
				return this.records;
			} else {
				return this.records.slice(0, this.limitShow);
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
			if (val && val.length > this.limit) {
				this.entity = val.slice(0, this.limit);
				this.$emit('input', val.slice(0, this.limit));
			} else this.$emit('input', val);
		},
	},
};
</script>
