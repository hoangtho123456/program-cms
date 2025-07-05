<template>
	<v-app>
		<div
			class="fill-height bg-cover bg-opacity-10 items-stretch bg-green-400"
			:style="`background-image: url(${assetsUrl('img/common/login-bg.png')})`"
		>
			<v-row no-gutters justify="center" align="center" class="h-full">
				<v-col cols="12" sm="8" md="4" lg="4">
					<v-form ref="formRef" lazy-validation @submit.prevent="login">
						<v-card class="elevation-8 rounded-xl py-3 px-6">
							<v-card-text>
								<div class="layout column align-center pt-8 pb-4">
									<AppLogo width="170" height="170" />
								</div>
	
								<v-text-field
									v-model="model.email"
									:label="$t('common.email')"
									:rules="emptyRules"
									append-icon="fas fa-user"
								/>
								<v-text-field
									v-model="model.password"
									:append-icon="showedPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"
									:type="showedPassword ? 'text' : 'password'"
									:label="$t('common.password')"
									:rules="emptyRules"
									@click:append="showedPassword = !showedPassword"
								/>
							</v-card-text>
							<div class="w-full text-center">
								<v-btn
									large
									class="mx-auto px-4 mb-2 primary"
									:loading="loading"
									:disabled="loading"
									type="submit"
								>
									{{ $t('common.signin') }}
									<v-icon class="ml-2" color="white" size="20">
										fal fa-long-arrow-right
									</v-icon>
								</v-btn>
								<p>
									<RouterLink
										style="text-decoration: underline"
										:to="!loading ? '/signup' : 'javascript:void(0)'"
									>
										{{ $t('common.signup') }}
									</RouterLink>
								</p>
							</div>
	
							<div class="text-center mb-4 error--text" v-if="message">
								{{ message }}
							</div>
						</v-card>
					</v-form>
				</v-col>
			</v-row>
		</div>
	</v-app>
</template>

<script>
export default {
	name: 'SingIn',
	data: () => ({
		loading: false,
		showedPassword: false,
		model: {
			email: null,
			password: null,
		},
		message: null,
	}),
	watch: {
		'$route.query': {
			immediate: true,
			async handler(obj) {
				if (obj.token) {
					const res = await this.$store.dispatch('loginByEmail', obj);
					if (!res) await this.$router.push(this.$route.query.redirect || '/');
					else {
						this.message = res;
					}
				}
			},
		},
	},
	methods: {
		async login() {
			const vm = this;
			if (vm.$refs['formRef'].validate()) {
				vm.loading = true;
				const res = await vm.$store.dispatch('loginByEmail', {
					email: vm.model.email,
					password: vm.model.password,
				});

				if (!res) {
					vm.$router.push('/');
				} else {
					vm.loading = false;
					vm.message = res;
				}
			}
		},
		signup () {
			this.$router.push('/signup');
		}
	},
};
</script>
