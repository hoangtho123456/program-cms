<template>
  <v-tooltip top>
    <template v-slot:activator="{ on, attrs }">
      <v-checkbox
        v-on="on"
        v-bind="attrs"
        v-model="isActive"
        :false-value="null"
        :true-value="value"
        @change="change"
        hide-details="auto"
      ></v-checkbox>
    </template>
    <span>{{ $t("common.activateOrDeactivate") }}</span>
  </v-tooltip>
</template>
<script>
export default {
  props: {
    value: {},
  },
  data() {
    return {
      isActive: null,
    };
  },
  methods: {
    toggle(val) {
      this.isActive = val ? this.value : null;
    },
    change(val) {
      this.$emit("change", val);
    },
  },
};
</script>
