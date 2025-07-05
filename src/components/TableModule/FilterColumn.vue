<template>
  <div v-if="items.length">
    <v-menu bottom :left="left" offset-y :max-width="maxWidth" :max-height="maxHeight">
      <template v-slot:activator="{ on, attrs }">
        <v-btn :color="choosedValidVal ? 'red' : 'grey'" small icon v-bind="attrs" v-on="on">
          <v-icon size="14">fas fa-filter</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item-group color="primary">
          <v-list-item v-for="(item, i) in itemAll" :key="i" @click="change(item)">
            <v-list-item-title class="cursor-pointer">{{ item.name || item }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
  </div>
</template>
<script>
export default {
  props: {
    maxWidth: {
      default: '500px', //string of number
    },
    maxHeight: {
      default: '400px', //string of number
    },
    items: {
      type: Array,
      default: () => [],
    },
    left: {
      type: Boolean,
      default: true
    },
    keyName: {
      type: String,
      default: '',
    },
  },
  name: 'FilterColumn',
  data() {
    return {
      selected: null,
      choosedValidVal: false
    };
  },
  computed: {
    itemAll() {
      const items = this.items || [];
      return [{ id: -1, name: "- - - - - - - - - -" }, ...items];
    },
  },
  methods: {
    change(val) {
      if (val?.id !== this.itemAll[0].id) {
        this.choosedValidVal = true;
      } else this.choosedValidVal = false;

      this.$emit('onChange', this.keyName, val);
    },
  },
  mounted() {
    //set first select
    // if (this.items.length) this.selected = this.items[0];
  },
};
</script>
