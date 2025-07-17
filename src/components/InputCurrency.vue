<template>
  <div>
    <p v-if="label" class="mb-1">
      {{ label }}
    </p>

    <v-text-field
      v-model="num"
      :class="numberClass"
      :disabled="disabled"
      :rules="rules"
      :placeholder="placeholder"
      hide-details="auto"
      onkeypress="return event.charCode == 46 || (event.charCode >= 48 && event.charCode <= 57)"
      outlined
      dense
    />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

export default Vue.extend({
  props: {
    value: {},
    label: {
      type: String,
      default: '',
    },
    rules: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
    disabled: {
      type: Boolean as PropType<Boolean>,
      default: false,
    },
    placeholder: {
      type: String,
      default: '',
    },
    numberClass: {
      type: String,
      default: '',
    },
  },
  computed: {
    num: {
      get():string {
        return this.parseCurrency(this.value);
      },
      set(val:string = ''): void {
        let amount:string | number = val;
        if (val) {
          amount = parseInt(val.replaceAll('.', ''));
        }
        this.$emit('input', amount);
      },
    },
  }
});
</script>
