<template>
	<v-btn
		elevation="0"
		:disabled="loading"
		:loading="loading"
		color="primary"
		class="px-8"
		@click="$emit('click')"
	>
		<v-icon size="16" class="mr-2">fal fa-save</v-icon>
		{{ $t('common.validate') }}
		<template v-slot:loader>
			<v-progress-circular indeterminate color="primary" size="28"></v-progress-circular>
		</template>
	</v-btn>
</template>
<script>
export default {
	props: {
		loading: {
			type: Boolean,
			default: false,
		},
	},
};
</script>
