<template>
  <v-overlay
    :value="true"
    style="z-index: 999"
    v-show="loading"
    color="#fff"
    opacity="0.5"
  >
    <v-progress-circular
      indeterminate
      color="primary"
      size="86"
    ></v-progress-circular>
  </v-overlay>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "TheLoader",
  data: () => ({
    dialog: true,
  }),
  computed: {
    ...mapState({
      loading: (state) => state.loading.loading,
    }),
  },
};
</script>
