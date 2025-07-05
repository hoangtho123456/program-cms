<template>
	<v-app-bar id="navbar" app flat fixed clipped-left :height="headerHeight">
		<div
			:style="{
				width: (navbarShow ? navbarWidth : navbarClipped ? navbarWidth : 0) + 'px',
				background: '#fff',
			}"
		>
			<div
				v-if="navbarClipped"
				class="d-flex items-center justify-between w-full pa-3"
			>
				<div>
					<AppLogo small />
				</div>

				<v-btn icon @click.stop="toggleNavbar">
					<inline-svg
						:src="assetsUrl('svg/menu.svg')"
						width="24"
						height="24"
						fill="#000"
					></inline-svg>
				</v-btn>
			</div>
		</div>

		<Breadcrumbs>
			<v-btn class="ml-4" icon @click.stop="toggleNavbar" v-if="!navbarClipped">
				<inline-svg
					:src="assetsUrl('svg/menu.svg')"
					width="24"
					height="24"
					fill="#000"
					class="text-white"
				></inline-svg>
			</v-btn>
		</Breadcrumbs>

		<v-spacer />

		<div class="pr-6">
			<AppProfile />
			<Localization dark />
			<AppNotification />
		</div>
	</v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex';
import Breadcrumbs from '@/components/widget/AppBreadcrumbs.vue';
import Localization from '@/components/widget/AppLocalization.vue';
import AppProfile from '@/components/widget/AppProfile.vue';
import AppNotification from '@/components/widget/AppNotification.vue';

export default {
	name: 'TheLayoutToolbar',
	components: {
		Breadcrumbs,
		Localization,
		AppProfile,
		AppNotification,
	},
	computed: {
		...mapGetters([
			'navbarWidth',
			'navbarClipped',
			'navbarShow'
		]),
		headerHeight() {
			return 70;
		},
	},
	methods: {
		toggleNavbar() {
			this.$store.commit('NAVBAR_TOGGLE');
		},
	},
};
</script>
<style lang="scss">
#navbar.v-app-bar.v-toolbar {
	background: var(--v-primary-base);
	&.v-app-bar--fixed {
		z-index: 100;
	}
	.v-toolbar__content {
		padding: 4px 0;
	}

	.v-breadcrumbs {
		font-size: 18px;
		font-weight: bold;
		padding-left: 15px;

		a {
			color: #fff;
		}

		.v-breadcrumbs__divider {
			color: #fff;
			font-size: 18px;
		}
	}
}
</style>
