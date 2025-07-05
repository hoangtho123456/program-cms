<template>
  <v-text-field
    ref="inputPhone"
    v-model="telephone"
    :disabled="disabled"
    :rules="rules"
    :key="`phoneInput_${refKey}`"
    v-mask="'### ### ####'"
    dense outlined
    hide-details="auto"
  >
  </v-text-field>
</template>

<script>
export default {
  name: "InputTelephone",
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {},
    rules: {},
  },
  data () {
    return {
      refKey: null
    }
  },
  computed: {
    telephone: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  }
};
</script>
