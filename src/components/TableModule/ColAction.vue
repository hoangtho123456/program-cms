<template>
	<div class="d-flex pl-2" :class="{ 'flex-column': vertical }">
		<v-tooltip top v-if="edit">
			<template v-slot:activator="{ on, attrs }">
				<v-btn
					v-bind="attrs"
					v-on="on"
					v-if="edit"
					small
					icon
					:title="editText || $t('common.edit')"
					@click="$emit('onAction', { type: 'edit', item: value })"
				>
					<v-icon size="16">{{ editIcon }}</v-icon>
				</v-btn>
			</template>
			<span>{{ editText || $t('common.edit') }}</span>
		</v-tooltip>

		<v-dialog v-model="dialog" persistent max-width="360" v-if="remove">
			<template v-slot:activator="{ on: dialog }">
				<v-tooltip top>
					<template v-slot:activator="{ on: tooltip, attrs }">
						<v-btn small icon v-bind="attrs" v-on="{ ...tooltip, ...dialog }">
							<v-icon size="16">far fa-trash-alt</v-icon>
						</v-btn>
					</template>
					<span>{{ $t('common.erase') }}</span>
				</v-tooltip>
			</template>
			<v-card>
				<v-card-title class="text-h5">
					{{ $t('common.confirmation') }}
				</v-card-title>
				<v-card-text>
					{{ $t('common.areYouSureDelete') }}
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="primary darken-1" text @click="onRemove">
						{{ $t('common.confirm') }}
					</v-btn>
					<v-btn color="grey darken-1" text @click="dialog = false">
						{{ $t('common.cancel') }}
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<v-tooltip top v-if="hasStatus">
			<template v-slot:activator="{ on, attrs }">
				<v-btn v-bind="attrs" v-on="on" small icon @click="change" :disabled="disabled">
					<v-icon size="18" color="warning" v-if="picked">fas fa-check-circle</v-icon>
					<v-icon size="18" v-else>far fa-circle</v-icon>
				</v-btn>
			</template>
			<span>{{ $t('common.activateOrDeactivate') }}</span>
		</v-tooltip>
	</div>
</template>

<script>
export default {
	props: {
		value: {},
		statusKey: {
			type: String,
			default: 'status',
		},
		hasStatus: {
			type: Boolean,
			default: true,
		},
		edit: {
			type: Boolean,
			default: true,
		},
		editIcon: {
			type: String,
			default: 'far fa-edit',
		},
		editText: {
			type: String,
			default: '',
		},
		remove: {
			type: Boolean,
			default: true,
		},
		vertical: {
			type: Boolean,
			default: true,
		},
	},
	data() {
		return {
			dialog: false,
			disabled: false,
		};
	},
	computed: {
		picked: {
			get() {
				return this.value[this.statusKey];
			},
			set(val) {
				const item = this.value;
				item[this.statusKey] = val;
				this.$emit('input', item);
			},
		},
	},
	methods: {
		onRemove() {
			this.dialog = false;
			this.$emit('onAction', { type: 'delete', item: this.value });
		},
		change() {
			const vm = this;
			const item = { id: vm.value.id };
			item[vm.statusKey] = vm.picked ? 0 : 1;
			vm.$emit('onAction', { type: 'toggleCheck', item: item });
			vm.disabled = true;
			setTimeout(() => {
				vm.disabled = false;
			}, 2000);
		},
	},
};
</script>
