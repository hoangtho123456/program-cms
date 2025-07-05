<template>
	<div class="form-style">
		<div class="form-main pa-5">
			<div class="white pa-4 rounded-md mb-4">
				<ProgramForm
					:form="programForm"
					:loading="loading"
					@onSubmit="submitMainForm"
				/>
			</div>

			<ProgramTab
				v-show="allowedToSendMeta"
				:value="metaForm"
				:loading="loading"
				@onSubmit="submitMeta"
			/>
		</div>

		<div class="form-footer text-center">
			<v-btn elevation="0" dark class="px-8" @click="onCancel">
				<v-icon size="16" class="mr-2">far fa-long-arrow-alt-left</v-icon>
				{{ $t('common.back') }}
			</v-btn>
		</div>
	</div>
</template>
<script>
import ProgramService from '@/services/ProgramService.js';
import { META_FORM } from './formCore';
import ProgramForm from '@/components/forms/ProgramForm.vue';
import BtnSubmit from '@/components/BtnSubmit.vue';
import ProgramTab from './ProgramTab.vue';

export default {
	components: {
		BtnSubmit,
		ProgramForm,
		ProgramTab,
	},
	data: () => ({
		loading: false,
		allowedToSendMeta: false,
		programForm: {},
		metaForm: JSON.parse(JSON.stringify(META_FORM))
	}),
	watch: {
		'$route.params.id': {
			immediate: true,
			async handler(id) {
				if (id) {
					this.$store.commit('loadingShow');
					const res = await ProgramService.detail(id);
					if (res) {
						this.programForm = this.getProgramData(res);
						this.allowedToSendMeta = true;
						this.setMetaData(res);
					}
					this.$store.commit('loadingHide');
				}
			},
		},
	},
	methods: {
		onCancel() {
			this.$router.go(-1);
		},
		setMetaData (val = {}) {
			if (!Object.keys(val || {}).length) return false;

			const tempForm = structuredClone(this.metaForm);
			for (const key of Object.keys(tempForm)) {
				if (val[key]) tempForm[key].content = val[key];
			}

			this.metaForm = { ...tempForm };
		},
		getProgramData (programData = {}) {
			// Note: formation(fr)/ training(en)
			if (!Object.keys(programData || {}).length) return {};

			programData = structuredClone(programData);
			if (programData.brochure) {
				programData.brochure = {
					...programData.brochure,
					name: programData.brochure.fileName
				}
			}

			return { ...programData };
		},
		async submitMainForm (form = {}) {
			if (!Object.keys(form || {}).length) return false;

			const vm = this;

			try {
				vm.loading = true;
				form = structuredClone(form);

				let action = vm.programForm.id ? 'update' : 'add';
				form.status = 1;
				if (!form.id) form.id = 1;

				const res = await ProgramService[action](form);
				if (res?.id) {
					if (action === 'add') {
						vm.allowedToSendMeta = true;
					}

					vm.$store.commit('appSnackbar/showSuccessBox', {
						message: this.$t('common.success')
					});
				}
			} catch (error) {
				vm.$store.commit('appSnackbar/showErrorBox', {
					message: error
				});
			} finally {
				vm.loading = false;
			}
		},
		async submitMeta (val = {}) {
			const vm = this;
			vm.loading = true;
			try {
				const obj = {};
				for (const key of Object.keys(val)) {
					obj[key] = val[key]?.content;
				}
				const form = { ...vm.programForm, ...obj };
				const res = await ProgramService['update'](form);
				if (res.id) {
					vm.setMetaData(res);
					vm.$store.commit('appSnackbar/showSuccessBox', {
						message: this.$t('common.success')
					});
				}
			} catch (error) {
				vm.$store.commit('appSnackbar/showErrorBox', {
					message: error
				});
			}
			vm.loading = false;
		},
	},
};
</script>
