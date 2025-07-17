<template>
	<v-tabs vertical class="program-tabs elevation-0">
		<v-tab
			v-for="(val, key) in tabData"
			:key="key + 'tab'"
		>
			<IconCheck :checked="hasDataOnTab(form[key])" />
			<span v-if="val.title">{{ val.title }}</span>
		</v-tab>
		<v-tab-item
			v-for="(val, key) in tabData"
			class="pa-4"
			:key="key"
		>
			<ckeditor
				v-model="form[key].content"
				:height="160"
			/>
			<v-btn
				class="mt-3 bg-gradient-to-r from-green-500 to-red-500 text-none white--text"
				:loading="loading"
				@click ="onSubmit(key, $event)"
			>
				<v-icon size="16" class="mr-2">fal fa-save</v-icon>
				{{ $t('common.submit') }}
			</v-btn>
		</v-tab-item>
	</v-tabs>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { isEmptyObject } from '@/utils';
import IconCheck from '@/components/IconCheck.vue';
import {
  description,
  presentation,
  prerequisite,
} from '@/views/programs/formCore';

export default Vue.extend({
	components: {
		IconCheck
	},
	props: {
		value: {
			type: Object as PropType<{}>,
			default: () => ({}),
		},
		loading: {
			type: Boolean,
			default: false,
		}
	},
	data: () => ({
		form: {},
	}),
	computed: {
		tabData() {
			return {
        description,
        presentation,
        prerequisite,
			};
		},
	},
	watch: {
		value: {
			immediate: true,
			handler(val) {
				this.form = { ...val };
			},
		},
	},
	methods: {
		onSubmit(key: string, val: any): void {
			const obj:any = {};
			obj[key] = val || {};
			this.$emit('onSubmit', obj);
		},
		hasDataOnTab(tab: any[]): boolean {
			if (tab) {
				for (const i in tab) {
					const item = tab[i];
					if (!item) return false;
					else if (item && !isEmptyObject(item)) {
						for (const k in item) {
							if (Array.isArray(item[k]) && item[k].length < 1) return false;
						}
					}
				}
			}
			return true;
		},
	},
});
</script>
<style lang="scss" scoped>
@use "sass:map";
@use 'vuetify/src/styles/settings' as v;

::v-deep {
	.v-tabs-bar {
		padding: 8px 0;
		border-right: 1px solid #e0e0e0;
	}
	.v-tab {
		padding: 8px 20px;
		margin: 0;
		height: auto;
		min-height: 36px;
		justify-content: flex-start;
		text-transform: none;
		font-weight: bold;
		max-width: 350px;
		white-space: normal;
		text-align: left;
	}
	.v-item-group {
		@media #{map.get(v.$display-breakpoints, 'md-and-up')} {
			min-width: 300px;
		}
	}
}
</style>
