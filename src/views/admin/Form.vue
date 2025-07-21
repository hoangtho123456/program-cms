<template>
	<v-form ref="formRef" class="form-style" @submit.prevent="onSubmit">
		<v-card class="form-main white pa-6 ma-3 elevation-0">
			<v-row class="relative">
				<v-col cols="12" md="4">
					<div class="mb-3">
						<div class="label-important mb-2">
							{{ $t('common.email') }}
						</div>
						<v-text-field
							v-model="form.email"
							:rules="[...emptyRules, ...emailRules]"
							:error-messages="errors.email"
							outlined
							dense
						></v-text-field>
					</div>
					<div class="mb-3">
						<div class="label-important mb-2">
							{{ $t('common.firstName') }}
						</div>
						<v-text-field
							v-model="form.firstName"
							:rules="emptyRules"
							:error-messages="errors.firstName"
							outlined
							dense
						></v-text-field>
					</div>
				</v-col>
				<v-col cols="12" md="4">
					<div class="mb-3">
						<div class="label-important mb-2">
							{{ $t('common.password') }}
						</div>
						<v-text-field
							v-model="model.password"
							:append-icon="show ? 'fas fa-eye' : 'fas fa-eye-slash'"
							@click:append="show = !show"
							:rules="editing ? [] : emptyRules"
							:type="show ? 'text' : 'password'"
							outlined
							dense
						/>
					</div>

					<div class="mb-3">
						<div class="label-important mb-2">
							{{ $t('common.lastName') }}
						</div>
						<v-text-field
							v-model="form.lastName"
							:rules="emptyRules"
							:error-messages="errors.lastName"
							outlined
							dense
						></v-text-field>
					</div>
				</v-col>
				<v-col cols="12" md="4">
					<div class="mb-3">
						<div class="label-important mb-2">
							{{ $t('common.password') }}
						</div>
						<v-text-field
							v-model="model.password"
							:append-icon="show ? 'fas fa-eye' : 'fas fa-eye-slash'"
							@click:append="show = !show"
							:rules="editing ? [] : emptyRules"
							:type="show ? 'text' : 'password'"
							outlined
							dense
						/>
					</div>

					<div class="mb-3">
						<div class="label-important mb-2">{{ $t('route.admin.roles') }}</div>
						<LazySelectInput
							v-model="form.subRoles"
							:items="roleList"
							:rules="emptyRules"
							:hideDetails="false"
						/>
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
				:loading="loading"
				color="primary"
				class="px-8"
				type="submit"
			>
				<v-icon size="16" class="mr-2">fal fa-save</v-icon>
				{{ $t('common.validate') }}
			</v-btn>
			<div style="width: 160px"></div>
		</div>
	</v-form>
</template>
<script lang="ts">
import Vue from 'vue';
import { mapMutations } from 'vuex';
import { ROLES_AS_OBJ } from '@/utils/constant';
import UserService from '@/services/UserService';
import MultiAutocomplete from '@/components/MultiAutocomplete.vue';
import LazySelectInput from '@/components/LazySelectInput.vue';

interface IForm {
	id?: IDType;
	firstName: string | NoneValue;
	lastName: string | NoneValue;
	email: string | NoneValue;
	subRoles: number | NoneValue;
}
const formIntial: IForm = {
	id: null,
	firstName: null,
	lastName: null,
	email: null,
	subRoles: null,
};

interface RefInstance extends Vue {
	validate(): boolean;
}

export default Vue.extend({
	components: {
		LazySelectInput,
		MultiAutocomplete,
	},
	name: 'AdminDetail',
	data: () => ({
		loading: false,
		form: { ...formIntial },
		show: false,
		model: {
			password: null,
			confirmPassword: null,
		},
		errors: {},
	}),
	computed: {
		roleList(): Record<string, any>[] {
			return [
				{
					id: 1,
					name: ROLES_AS_OBJ.admin
				},
				{
					id: 2,
					name: ROLES_AS_OBJ.user
				},
				{
					id: 3,
					name: ROLES_AS_OBJ.editor
				}
			]
		},
		editing(): boolean {
			return !!this.form.id;
		},
	},
	watch: {
		'$route.params.id': {
			immediate: true,
			async handler(id: IDType): Promise<void> {
				if (id) {
					this.loadingShow();
					const res = await UserService.detail(id);
					if (res) {
						this.form = {
							id: res.id,
							firstName: res.firstName,
							lastName: res.lastName,
							email: res.email,
							subRoles: res.subRoles?.[0],
						};
					}
					this.loadingHide();
				}
			},
		},
	},
	methods: {
		...mapMutations(['loadingShow','loadingHide']),
		onCancel(): void {
			this.$router.go(-1);
		},
		async onSubmit(): Promise<void> {
			const vm = this;

			if (!(vm.$refs['formRef'] as RefInstance).validate()) {
				return;
			}

			try {
				vm.loading = true;
				const form:Record<string, any> = { ...vm.form, ...vm.model };
				const action = vm.form.id ? 'update' : 'add';
				if (action === 'update') {
					if (!form.password) {
						delete form.password;
						delete form.confirmPassword;
					}
				}
				const res = await UserService[action](form);
				if (res.id) {
					vm.$store.commit('appSnackbar/showSuccessBox', {
						message: this.$t('common.success')
					});
				} else {
					vm.$router.go(-1); //back
				}
			} catch (error) {
				vm.$store.commit('appSnackbar/showErrorBox', {
					message: error
				});
			} finally {
				vm.loading = false;
			}
		},
	}
});
</script>
