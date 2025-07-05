<template>
  <v-dialog
    v-model="dialog"
    :max-width="options.width"
    persistent
    @keyup.esc="cancel"
  >
    <v-card>
      <v-card-title class="justify-center">
        <div>
          <AppLogo />
        </div>
      </v-card-title>

      <!-- class="body-1" -->
      <v-card-text
        v-show="!!message"
        v-html="message"
      ></v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary darken-1" text @click="confirm">
          {{ options.textConfirm || $t("common.confirm") }}
        </v-btn>
        <v-btn color="grey darken-1" v-if="!hideCancel" text @click="cancel">
          {{ $t("common.cancel") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Confirm",
  props: {
    hideCancel: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      dialog: false,
      resolve: null,
      message: null,
      options: {
        color: "primary",
        width: 360,
				textConfirm: null,
      },
    };
  },
  methods: {
    open(message, options) {
      this.dialog = true;
      this.message = message;
      this.options = Object.assign(this.options, options);

      return new Promise((resolve) => {
        this.resolve = resolve;
      });
    },
    cancel() {
      this.resolve(false);
      this.dialog = false;
    },
    confirm() {
      this.resolve(true);
      this.dialog = false;
    },
  },
};
</script>
