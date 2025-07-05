<template>
  <span
    class="t-sort-column"
    :class="{
      'icon-bottom': iconBottom,
      'text-left': align === 'left',
      'text-right': align === 'right'
    }"
    @click="change"
  >
    <span>
      <slot></slot>
    </span>
    <span class="t-sort-column__icon">
      <i class="far fa-long-arrow-up" :class="['grey--text', { 'primary--text': isAsc === false }]"></i>
      <i class="far fa-long-arrow-down" :class="['grey--text', { 'primary--text': isAsc === true }]"></i>
    </span>
  </span>
</template>
<script>
export default {
  props: {
    align: {
      type: String,
      default: 'center'
    },
    keyName: {
      type: String,
      default: '',
    },
    iconBottom: {
      type: Boolean,
      default: false,
    },
  },
  name: 'SortColumn',
  data() {
    return {
      isAsc: null,
    };
  },
  methods: {
    change() {
      const vm = this;
      const val = vm.isAsc;
      vm.isAsc = val === true ? false : true;
      vm.$emit('onChange', vm.keyName, vm.isAsc);
    },
    setSort(val) {
      this.isAsc = val;
    },
  },
};
</script>
