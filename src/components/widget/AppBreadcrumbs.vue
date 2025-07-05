<template>
  <div class="flex items-center">
    <div><slot></slot></div>
    <v-breadcrumbs class="hidden-sm-and-down" :items="levelList" divider="/">
      <template v-slot:item="props">
        <a>
          {{ generateTitle(props.item.meta.title) }}
          <span
            style="font-family: monospace"
            v-if="!props.item.meta.hideTotal && totalNumber > 0"
          >
            ({{ totalNumber }})
          </span>
        </a>
      </template>
    </v-breadcrumbs>
  </div>
</template>

<script>
import { serialize } from "@/utils";
export default {
  name: "AppBreadcrumbs",
  data: () => ({
    levelList: null,
  }),
  watch: {
    $route() {
      this.getBreadcrumb();
    },
  },
  computed: {
    totalNumber() {
      return this.$store.state.totalNumber;
    },
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    generateTitle(title) {
      const hasKey = this.$te(`${title}`);
      if (hasKey) {
        const translatedTitle = this.$t(`${title}`);
        return translatedTitle;
      }

      return title;
    },
    getBreadcrumb() {
      let matched = this.$route.matched.filter((item) => item.name);
      this.levelList = matched.filter(
        (item) =>
          item.meta &&
          item.meta.title &&
          !item.meta.hidden &&
          item.meta.breadcrumb !== false
      );
    }
  },
};
</script>
