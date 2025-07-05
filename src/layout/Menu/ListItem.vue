<template>
  <v-list-item :to="path">
    <v-list-item-icon>
      <v-icon>{{ icon }}</v-icon>
    </v-list-item-icon>

    <v-list-item-title>
      <v-tooltip top v-if="tooltip">
        <template v-slot:activator="{ on, attrs }">
          <span v-bind="attrs" v-on="on">{{ $t(text) }}</span>
        </template>
        <span>{{ $t(text) }}</span>
      </v-tooltip>
      <template v-else>{{ $t(text) }}</template>
    </v-list-item-title>
  </v-list-item>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      value: "",
    },
    icon: {
      type: String,
      value: "",
    },
    path: {
      type: String,
      default: undefined,
    },
    tooltip: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
