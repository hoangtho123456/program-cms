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

<script>
export default {
  props: {
    value: {},
    label: {
      type: String,
      default: '',
    },
    rules: {
      type: Array,
      default: () => [],
    },
    disabled: {
      type: Boolean,
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
      get() {
        return this.parseCurrency(this.value);
      },
      set(val = '') {
        let amount = val;
        if (val) {
          amount = parseInt(val.replaceAll('.', ''));
        }
        this.$emit('input', amount);
      },
    },
  }
}
</script>
