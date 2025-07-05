<template>
	<v-menu
		ref="menu"
		v-model="menu"
		:close-on-content-click="false"
		transition="scroll-y-transition"
		offset-y
		bottom
		left
		min-width="auto"
	>
		<template v-slot:activator="{ on, attrs }">
			<v-text-field
				:value="dateFormated"
				outlined
				dense
				clearable
				prepend-inner-icon="far fa-calendar"
				readonly
				:hide-details="hideDetails"
				:rules="rules"
				:placeholder="placeholder"
				v-bind="attrs"
				v-on="on"
				:style="`min-width: 150px; width: ${width}`"
				:class="{ 'v-input-tiny': size === 'tiny' }"
				:disabled="disabled"
				@click:clear="date = null"
			></v-text-field>
		</template>
		<v-date-picker v-model="date" no-title :min="minLimit" :max="maxLimit">
			<template v-if="clickConfirm">
				<v-spacer></v-spacer>
				<v-btn text color="primary" @click="menu = false">
					{{ $t('common.cancel') }}
				</v-btn>
				<v-btn text color="primary" @click="$refs.menu.save(date)">
					{{ $t('common.confirm') }}
				</v-btn>
			</template>
		</v-date-picker>
	</v-menu>
</template>
<script>
export default {
	props: {
		value: {},
		clickConfirm: {
			type: Boolean,
			default: false,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		nowDate: {
			type: Boolean,
			default: true,
		},
		minDate: {},
		maxDate: {},
		hideDetails: {
			default: 'auto',
		},
		rules: {
			type: Array,
			default: () => [],
		},
		width: {
			default: 'auto',
		},
		size: {
			type: String,
		},
		formatIn: {
			type: String,
			default: 'DD-MM-YYYY',
		},
		formatOut: {
			type: String,
			default: 'YYYY-MM-DD',
		},
		placeholder: {
      type: String,
      default: ''
    },
	},
	data() {
		return {
			once: true,
			menu: false,
			date: null,
		};
	},
	computed: {
		dateFormated() {
			return this.date ? this.$dayjs(this.date).format(this.formatIn) : '';
		},
		minLimit() {
			if (this.minDate) return this.minDate;
			return this.nowDate ? new Date().toISOString().slice(0, 10) : null;
		},
		maxLimit () {
      if (!this.maxDate) return null
      return this.maxDate
    },
	},
	watch: {
		value: {
			immediate: true,
			handler(val) {
				if (this.once && val) {
					this.once = false;
					this.date = this.formatDate(val, false);
				}
			},
		},
		date(val) {
			const dmy = this.formatOut === 'DD-MM-YYYY';
			const out = val ? this.formatDate(val, dmy) : '';
			this.$emit('input', out);
		},
	},
};
</script>
