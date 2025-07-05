<template>
  <v-app>
    <the-layout-menu />
    <the-layout-toolbar />
    <the-layout-content />
    <TheLoader />
  </v-app>
</template>
<script>
import { mapState } from "vuex";
import TheLayoutMenu from "./Menu/index.vue";
import TheLayoutToolbar from "./TheLayoutToolbar.vue";
import TheLayoutContent from "./TheLayoutContent.vue";
import TheLoader from "./TheLoader.vue";

export default {
  name: "TheLayout",
  components: {
    TheLayoutMenu,
    TheLayoutToolbar,
    TheLayoutContent,
    TheLoader,
  },
  computed: {
    ...mapState({
      loading: (state) => state.loading.loading,
    }),
  },
};
</script>
