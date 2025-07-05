<template>
	<v-form ref="formRef" class="form-style" lazy-validation @submit.prevent="onSubmit">
		<v-card class="form-main pa-6 elevation-0">
			<v-row class="relative white">
				<v-col cols="12" md="4">
					<div class="mb-3">
						<div class="label-default label-extend mb-2">
							{{ $t('common.image') }} ( 750x420 )
							<span>({{ $t('common.max') }} 3MB)</span>
						</div>
						<MultiUpload
							v-model="form.media"
							:width="750"
							:height="420"
							:maxImage="1"
							single
						/>
					</div>
				</v-col>
				<v-col cols="12" md="8">
					<div class="mb-3">
						<div class="label-important mb-2">{{ $t('route.news.title') }}</div>
						<v-text-field
							v-model="form.title"
							:rules="emptyRules"
							hide-details="auto"
							outlined
							dense
						></v-text-field>
					</div>
					<div class="mb-3">
						<div class="label-default mb-2">
							{{ $t('common.description') }}
						</div>
						<v-textarea
							v-model="form.description"
							hide-details="auto"
							outlined
							dense
						></v-textarea>
					</div>
					<div class="mb-3">
						<div class="label-default mb-2">{{ $t('common.content') }}</div>
						<ckeditor ref="ckeditor" v-model="form.content" :height="320" />
					</div>
				</v-col>
			</v-row>
		</v-card>

		<div class="form-footer text-center">
			<v-btn elevation="0" dark class="px-8" @click="onCancel">
				<v-icon size="16" class="mr-2">far fa-long-arrow-alt-left</v-icon>
				{{ $t('common.back') }}
			</v-btn>
			<v-btn
				elevation="0"
				:disabled="loading"
				:loading="loading"
				color="primary"
				class="px-8"
				type="submit"
			>
				<v-icon size="16" class="mr-2">fal fa-save</v-icon>
				{{ $t('common.validate') }}
				<template v-slot:loader>
					<v-progress-circular
						indeterminate
						color="primary"
						size="28"
					></v-progress-circular>
				</template>
			</v-btn>
			<div style="width: 160px"></div>
		</div>
	</v-form>
</template>

<script>
import NewsService from '@/services/NewsService.js';
import MultiUpload from '@/components/FileUpload/MultiUpload.vue';
import MultiAutocomplete from '@/components/MultiAutocomplete.vue';
import LazySelectInput from '@/components/LazySelectInput.vue';

const formIntial = {
	title: null,
	description: null,
	content: null,
	media: undefined,
	createdDate: new Date(),
};

export default {
	components: {
		MultiUpload,
		MultiAutocomplete,
		LazySelectInput,
	},
	name: 'NewsDetail',
	data: () => ({
		loading: false,
		form: { ...formIntial },
	}),
	methods: {
		onCancel() {
			this.$router.go(-1);
		},
		async onSubmit() {
			const vm = this;

			try {
				if (!vm.$refs['formRef'].validate()) {
					return false;
				}

				if (!ck?.isRequired()) return false;
				const ck = this.$refs.ckeditor;

				vm.loading = true;
				const action = vm.form.id ? 'update' : 'add';
				const form = { ...vm.form };
				await NewsService[action](form);
				vm.$store.commit('appSnackbar/showSuccessBox', {
					message: this.$t('common.success')
				});
			} catch (err) {
				vm.$store.commit('appSnackbar/showErrorBox', {
					message: err
				});
			} finally {
				vm.loading = false;
			}
		},
	},
	watch: {
		'$route.params.id': {
			immediate: true,
			async handler(id) {
				if (id) {
					this.$store.commit('loadingShow');
					this.form = await NewsService.detail(id);
					this.$store.commit('loadingHide');
				}
			},
		},
	},
};
</script>
