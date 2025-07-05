<template>
	<v-navigation-drawer
		id="side-nav" app
		:clipped="navbarClipped"
		:width="navbarWidth"
		:value="navbarShow"
		@input="stateNavbarShow"
	>
		<template v-slot:prepend v-if="!navbarClipped">
			<div class="text-center py-2">
				<AppLogo small />
			</div>
		</template>

		<v-list>
			<template v-for="(navItem, index) in filterVisibleRoutes(navRoutes)">
				<list-group
					v-if="isGroupItem(navItem)"
					:key="`listGroup_${index}`"
					:item="navItem"
					:hidden="navItem.hidden"
				></list-group>
				<list-item
					v-else
					:key="`listItem_${index}`"
					:text="navItem.meta.title"
					:icon="navItem.meta.icon"
					:hidden="navItem.hidden"
					:path="navItem.path"
				></list-item>
			</template>
		</v-list>

		<template v-slot:append>
			<div class="d-flex justify-center primary">
				<v-btn
					class="d-flex bg-primary flex-grow-1 rounded-none"
					x-large
					color="secondary"
					to="/admin-list"
					v-if="isAdmin"
				>
					<span>{{ $t('route.admin.base') }}</span>
				</v-btn>
				<v-tooltip right>
					<template v-slot:activator="{ on, attrs }">
						<v-btn x-large icon dark @click="logout" v-bind="attrs" v-on="on">
							<v-icon size="20">fal fa-power-off</v-icon>
						</v-btn>
					</template>
					<span>{{ $t('common.logout') }}</span>
				</v-tooltip>
			</div>
		</template>
	</v-navigation-drawer>
</template>
<script>
import { mapGetters } from 'vuex';
import ListItem from './ListItem.vue';
import ListGroup from './ListGroup.vue';

export default {
	name: 'Menu',
	components: { ListItem, ListGroup },
	inject: ['globalRef'],
	computed: {
		...mapGetters([
			'appRoutes',
			'navbarShow',
			'navbarWidth',
			'navbarClipped',
		]),
		userRoles() {
			return this.$store.getters.roles;
		},
		isAdmin() {
			return this.userRoles.some((x) => x === this.rolesAsObj.admin);
		},
		navRoutes() {
			const routes = [];
			for (const item of this.appRoutes) {
				if (!this.isAdmin && item.roles?.length) {
					for (const userRole of this.userRoles) {
						if (!item.roles.includes(userRole)) {
							if (!item.hidden) item.hidden = true;
						}
					}
				}

				if (!item.hidden) {
					const children = item.children || [];
					const filtered = children.filter((x) => !x.hidden);
					if (children && children.length === 1) {
						routes.push(item.children[0]);
					} else if (filtered && filtered.length === 1) {
						routes.push({ ...filtered[0], icon: item.meta.icon });
					} else {
						routes.push({
							...item,
							children: [...filtered]
						});
					}
				}
			}

			return routes;
		},
	},
	methods: {
		isGroupItem(navItem) {
			return navItem.children && navItem.children.length > 0;
		},
		stateNavbarShow(state) {
			this.$store.commit('NAVBAR_STATE', { state });
		},
		filterVisibleRoutes (routes = []) {
			if (!routes?.length) return [];

			let result = routes
				.map(route => {
					if (route.hidden) return null;

					const newRoute = { ...route };

					if (newRoute.children) {
						// Recursively filter children
						newRoute.children = this.filterVisibleRoutes(newRoute.children);

						// If only one child remains,
						// replace parent with child
						if (newRoute.children.length === 1) {
							if (Object.keys(newRoute.children[0].meta || {}).length) {
								newRoute.children[0].meta.icon = '';
							}
							return newRoute.children[0];
						}
					}

					return newRoute;
				}).filter(Boolean); // Remove nulls (hidden routes)

			return result;
		},
		async logout() {
			const confirmed = await this.globalRef?.globalConfirmRef?.open(this.$t('common.areYouSureToLogout'));
      if (!confirmed) return false;

			this.$store.dispatch('logOut');
			this.$router.push('/login');
		},
	},
};
</script>
<style lang="scss">
#side-nav {
	box-shadow: 2px 0px 2px rgba(0, 0, 0, 0.1);
	.v-list-item--active {
		color: var(--v-primary-base);
	}
	.v-list-item__icon {
		margin-right: 16px;
	}
	.v-list-group__header__append-icon {
		margin-right: 8px;
		min-width: 20px;
	}
	.v-list-item__icon {
		.v-icon {
			font-size: 16px;
			&.fa-caret-down {
				margin-left: 4px;
			}
		}
	}
	.v-list-item__title {
		font-size: 1rem;
	}
	.v-navigation-drawer__content {
		&>.v-list {
			padding: 0;
			&>.v-list-item > .v-list-item__title,
			.v-list-group > .v-list-item > .v-list-item__title {
				font-weight: bold;
			}
			.v-list-group > .v-list-group__items .v-list-item > .v-list-item__title {
				font-size: 0.8rem;
			}
		}
	}
	.v-list-group {
		.v-list-group__items {
			.v-list-item:has(.v-list-item__title:empty) {
				display: none;
			}
		}
	}
}
.rounded-none {
	border-radius: 0;
}
</style>
