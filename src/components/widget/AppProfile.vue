<template>
  <v-menu
    offset-y
    origin="center center"
    :nudge-bottom="10"
    transition="scale-transition"
  >
    <template v-slot:activator="{ on }">
      <v-btn dark text v-on="on">
        {{ fullName }}
      </v-btn>
    </template>
    <v-list class="pa-0">
      <v-list-item
        v-for="(item, index) in menuitems"
        :key="index"
        :to="!item.href ? { name: item.name } : null"
        :href="item.href"
        ripple="ripple"
        :disabled="item.disabled"
        :target="item.target"
        rel="noopener"
        @click="item.click"
      >
        <v-list-item-action v-if="item.icon">
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "AppProfile",
  inject: ['globalRef'],
  data() {
    return {
      menuitems: [
        {
          icon: "far fa-sign-out",
          href: "#",
          title: "common.logout",
          click: () => {
            this.logout();
          },
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["user", "status"]),
    fullName() {
      const user = this.user?.user || this.user;
      return user.firstName + " " + user.lastName;
    },
  },
  methods: {
    async logout() {
      const confirmed = await this.globalRef?.globalConfirmRef?.open(this.$t('common.areYouSureToLogout'));
      if (!confirmed) return false;

      this.$store.dispatch('logOut');
      this.$router.push("/login");
    },
  },
};
</script>
