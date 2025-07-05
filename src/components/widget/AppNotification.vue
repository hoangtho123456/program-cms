<template>
	<v-menu
		offset-y
		origin="center center"
		:nudge-bottom="10"
		transition="scale-transition"
		:close-on-content-click="false"
	>
		<template v-slot:activator="{ on }">
			<v-btn dark icon text v-on="on" class="relative">
				<v-icon size="18">fas fa-bell</v-icon>
				<span
					class="absolute -top-2 right-0 w-5 h-5 rounded-full bg-red-500 text-xs flex justify-center items-center overflow-hidden"
					v-if="arrLength > 0"
				>
					{{ arrLength }}
				</span>
			</v-btn>
		</template>
		<v-list class="pa-0 white" two-line subheader :width="400" :max-height="480">
			<v-subheader class="white">Notifications</v-subheader>
			<v-divider color="#eee" />
			<template v-if="notify && notify.length">
				<div
					class="w-full d-flex align-center py-3"
					v-for="(item, key) in notify"
					:key="key"
					avatar
					v-if="item.isSeen == 0"
				>
					<v-btn icon :class="[item.iconClass]" class="mx-3">
						<v-icon size="16" @click="onSeenRedirect(item.id, item.profile_id)">
							{{ item.icon }}
						</v-icon>
					</v-btn>

					<div class="flex-1" @click="onSeenRedirect(item.id, item.profile_id)" v>
						<div>{{ item.title }}</div>
						<div class="caption grey--text">{{ item.subtitle }}</div>
					</div>

					<v-btn icon small @click="onSeen(item.id)" class="mr-1">
						<v-icon size="16">fas fa-times</v-icon>
					</v-btn>
				</div>
			</template>
			<v-list-item v-else>
				<v-list-item-content>
					<v-list-item-title>{{ $t('common.noData') }}</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</v-list>
	</v-menu>
</template>

<script>
export default {
	name: 'AppNotification',
	data: () => ({
		notify: [],
	}),
	computed: {
		messages() {
			return this.$store.getters.getList('messages');
		},
		arrLength() {
			const arr = this.notify.filter((x) => x.isSeen == 0);
			return arr.length;
		},
	},
	watch: {
		messages(val) {
			this.notify = this.setNotify(val);
		},
	},
	methods: {
		setNotify(notiList) {
			const icon = {
				icon: 'fa-regular fa-id-card',
				iconClass: 'green white--text',
			};
			const list = notiList.map((x) => {
				return {
					id: x.id,
					profile_id: x.profile_id,
					title: x.title,
					subtitle: x.subTitle,
					...icon,
					isSeen: x.isSeen,
				};
			});
			return list || [];
		},
		onSeen(id) {
			this.$store.dispatch('loadReadMessage', { id: id, seen: 1 });
			const item = this.notify.find((x) => x.id == id);
			item.isSeen = 1;
		},
		onSeenRedirect(id, profile_id) {
			console.log(id, profile_id);
		},
		onSeenList(notify) {
			const listIds = notify.map((x) => x.id).join();
			this.$store.dispatch('loadReadMessageList', { listIds });
			this.notify = this.notify.map((x) => {
				return {
					...x,
					isSeen: 1,
				};
			});
		},
	},
};
</script>
