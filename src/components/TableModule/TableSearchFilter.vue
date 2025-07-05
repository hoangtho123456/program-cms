<template>
  <v-row no-gutters>
    <slot></slot>
    <v-col
      class="pa-2"
      cols="12"
      :sm="6"
      :lg="val.col || 3"
      v-for="(val, key) in items"
      :key="key"
    >
      <v-text-field
        v-model="search[val.key]"
        :placeholder="$t(val.name)"
        outlined
        dense
        hide-details="auto"
        filled
      ></v-text-field>
    </v-col>
  </v-row>
</template>
<script>
import { debounce } from "@/utils";
export default {
  props: {
    items: {
      type: Object,
      default: () => {},
    },
  },
  data: () => ({
    search: {},
  }),
  watch: {
    search: {
      deep: true,
      handler: debounce(function (val) {
        const obj = {};
        const it = this.items;
        for (const i in it) {
          if (val[it[i].key]) obj[it[i].key] = val[it[i].key];
        }
        this.$emit("onSearch", obj);
      }, 500),
    },
  },
};
</script>
