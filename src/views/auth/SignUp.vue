<template>
	<v-app>
		<div
			class="fill-height bg-cover bg-opacity-10 items-stretch"
			:style="`background-image: url(${assetsUrl('img/common/login-bg.png')})`"
		>
			<v-row no-gutters justify="center" align="center" class="h-full">
				<v-col cols="12" sm="8" md="4" lg="4">
					<v-card class="elevation-8 rounded-xl pa-3">
						<v-card-text>
							<div class="layout column align-center">
								<AppLogo />
							</div>

							<v-form>
								<v-text-field
									v-model="model.email"
									append-icon="fas fa-user"
									name="email"
									:label="$t('common.email')"
									type="email"
									required
								/>
								<v-text-field
									v-model="model.password"
									:append-icon="show ? 'fas fa-eye' : 'fas fa-eye-slash'"
									@click:append="show = !show"
									:type="show ? 'text' : 'password'"
									name="password"
									:label="$t('common.password')"
									required
									autocomplete="new-password"
								/>
								<v-text-field
									v-model="model.confirm"
									:append-icon="show ? 'fas fa-eye' : 'fas fa-eye-slash'"
									@click:append="show = !show"
									:type="show ? 'text' : 'password'"
									name="confirm"
									:label="$t('common.confirm')"
									required
									autocomplete="new-password"
								/>
							</v-form>
						</v-card-text>

						<v-card-actions>
							<Localization />
							<v-btn icon>
								<v-icon color="blue">fa-brands fa-facebook</v-icon>
							</v-btn>
							<v-btn icon>
								<v-icon color="red">fa-brands fa-google</v-icon>
							</v-btn>
							<v-btn icon>
								<v-icon color="light-blue">fa-brands fa-twitter</v-icon>
							</v-btn>
							<v-spacer />
							<v-btn color="primary" outlined to="/signin">
								{{ $t('common.signin') }}
							</v-btn>
							<v-btn color="primary" :loading="loading" @click="login">
								{{ $t('common.signup') }}
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-col>
			</v-row>
		</div>
	</v-app>
</template>

<script>
import Localization from '@/components/widget/AppLocalization.vue';

export default {
	name: 'SignUp',
	components: { Localization },
	data: () => ({
		loading: false,
		show: false,
		model: {
			email: null,
			password: null,
			confirm: null,
		},
	}),
	methods: {
		login() {
			this.loading = true;
			setTimeout(() => {
				this.$router.push('/signin');
			}, 1000);
		},
	},
};
</script>
