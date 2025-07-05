<template>
  <v-list-group
    :prepend-icon="subGroup ? null : item.meta.icon"
    :sub-group="subGroup"
  >
    <template v-slot:activator>
      <v-list-item-title>{{ $t(item.meta.title) }}</v-list-item-title>
    </template>

    <div v-for="(child, i) in item.children" :key="i">
      <list-group
        v-if="isGroupItem(child)"
        :item="child"
        subGroup
      ></list-group>
      <list-item
        :text="child.meta.title"
        :icon="child.meta.icon"
        :path="child.path"
        :tooltip="child.meta.tooltip"
      ></list-item>
    </div>
  </v-list-group>
</template>

<script>
import ListItem from "./ListItem.vue";
export default {
  name: "ListGroup",
  components: {
    ListItem,
  },
  props: {
    item: {
      type: Object,
      default: () => ({
        title: "",
        icon: "",
        children: [],
      }),
    },
    subGroup: {
      type: Boolean,
      default: false,
    },
    hidden: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    isGroupItem(item) {
      return item.children && item.children.length > 0;
    },
  },
};
</script>
