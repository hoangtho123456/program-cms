<template>
  <v-dialog v-model="dialog" max-width="600">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-progress-circular
          indeterminate
          color="primary"
          v-if="loading"
        ></v-progress-circular>
        <v-icon
          v-else
          size="18"
          :color="noteComputed ? 'primary' : 'gray'"
          v-bind="attrs"
          v-on="on"
          >{{ (noteComputed ? "fas " : "fal ") + icon }}</v-icon
        >
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="text-h5">{{ title }}</v-card-title>
      <v-card-text>
        <v-textarea
          v-model="output"
          rows="6"
          outlined
          hide-details="auto"
          :readonly="disabled"
        ></v-textarea>
      </v-card-text>
      <v-card-actions class="justify-center pt-0 pb-4">
        <v-btn elevation="0" color="primary" @click="onClick" v-if="!disabled">
          {{ $t("common.validate") }}
        </v-btn>
        <v-btn elevation="0" @click="dialog = false">
          {{ $t("common.cancel") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    note: {},
    disabled: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: "fa-sticky-note",
    },
    title: {
      type: String,
      default: "Noter",
    },
  },
  data() {
    return {
      dialog: false,
      loading: false,
      output: "",
    };
  },
  watch: {
    note: {
      immediate: true,
      handler(val) {
        this.output = val;
      },
    },
  },
  computed: {
    noteComputed() {
      return this.note && this.note.trim();
    },
  },
  methods: {
    async onClick() {
      this.dialog = false;
      this.loading = true;
      this.$emit("onNote", this.output);
      this.loading = false;
    },
  },
};
</script>
