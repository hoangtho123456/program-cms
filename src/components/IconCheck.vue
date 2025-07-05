<template>
	<v-tooltip top>
		<template v-slot:activator="{ on, attrs }">
			<v-icon v-on="on" v-bind="attrs" v-if="checked" left color="primary" size="16">
				fas fa-check-circle
			</v-icon>
			<v-icon v-on="on" v-bind="attrs" v-else left color="#ddd" size="16">
				fas fa-circle
			</v-icon>
		</template>
		<span class="ml-2">{{ $t('common.activateOrDeactivate') }}</span>
	</v-tooltip>
</template>
<script>
export default {
	props: {
		checked: {
			type: Boolean,
			default: false,
		},
	},
};
</script>
