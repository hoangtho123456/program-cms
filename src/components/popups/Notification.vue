<template>
	<v-dialog
		v-model="dialog"
    max-width="500"
		@keyup.esc="cancel"
	>
    <v-card>
      <v-card-title class="justify-center">
        <div>
          <AppLogo />
        </div>
      </v-card-title>
      <v-card-text>
        <div v-if="message" class="text-center fsize-1">
          {{ message }}
        </div>

        <slot />
      </v-card-text>
      <v-card-actions class="justify-center pb-5">
        <v-btn color="primary" @click="cancel">
          {{ $t("common.close") }}
        </v-btn>
      </v-card-actions>
    </v-card>
	</v-dialog>
</template>

<script>
export default {
	name: 'NotificationPopup',
	props: {
    value: {
      type: Boolean,
      default: false
    },
		title: {
			type: String,
			default: '',
		},
    message: {
      type: String,
      default: ''
    }
	},
  computed: {
    dialog: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
	methods: {
		cancel() {
			this.dialog = false;
		},
	},
};
</script>
<style lang="scss" scoped>
.fsize-1 { font-size: 16px; }
</style>