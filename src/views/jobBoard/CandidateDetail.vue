<template>
	<div class="form-style">
		<CandidateForm
			class="form-main pa-5"
			:form="mainForm"
			:loading="loading"
			@onSubmit="onSubmit"
		/>

		<div class="form-footer text-center">
			<v-btn elevation="0" dark class="px-8" @click="onCancel">
				<v-icon size="16" class="mr-2">far fa-long-arrow-alt-left</v-icon>
				{{ $t('common.back') }}
			</v-btn>
		</div>
	</div>
</template>
<script>
import { hasResponseError } from '@/utils';
import JobCandidateService from '@/services/JobCandidateService.js';
import CandidateForm from '@/components/forms/CandidateForm.vue';

export default {
	components: {
		CandidateForm
	},
	data: () => ({
		loading: false,
		mainForm: {},
	}),
	computed: {
		actions () {
			return {
				add: 'add',
				update: 'update'
			}
		}
	},
	watch: {
		'$route.params.id': {
			immediate: true,
			async handler (id) {
				if (id) {
					const res = await JobCandidateService.detail(id);
					if (res) {
						this.mainForm = structuredClone(res);
					}
				}
			},
		},
	},
	methods: {
		onCancel() {
			this.$router.go(-1);
		},
		async onSubmit(val = {}) {
			if (!Object.keys(val || {}).length) return false;

			const vm = this;
			try {
				vm.loading = true;

				let action = vm.mainForm.id ? this.actions.update : this.actions.add;
				const form = structuredClone(val);

				const res = await JobCandidateService[action](form);
				if (!hasResponseError(res)) {
					vm.$store.commit('appSnackbar/showSuccessBox', {
						message: this.$t('common.success')
					});
				}
			} catch (error) {
				vm.$store.commit('appSnackbar/showErrorBox', {
					message: 'Has error from the server!'
				});
			} finally {
				vm.loading = false;
			}
		},
	},
};
</script>
