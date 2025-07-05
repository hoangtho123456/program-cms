<template>
  <v-snackbar v-model="toggledSnackbar">
    {{ formattedMessage }}
    <template v-slot:action="{ attrs }">
      <v-btn :color="!hasError ? 'success' : 'error'" text v-bind="attrs" @click="onClose">
        {{ $t('common.close') }}
      </v-btn>
    </template>
  </v-snackbar>
</template>
<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'GlobalSnackbar',
  data: () => ({
    toggledSnackbar: false,
  }),
  computed: {
    ...mapState({
      showed: state => state.appSnackbar.showed,
      message: state => state.appSnackbar.message,
      hasError: state => state.appSnackbar.hasError
    }),
    formattedMessage () {
      if ( this.message.constructor === Object) {
        return this.truncateText(this.message.error || JSON.stringify(this.message), 60);
      }

			return this.message;
    },
	},
  watch: {
    showed (val) {
      if (val) this.toggledSnackbar = val;
    },
    toggledSnackbar (val) {
      if (!val) this['appSnackbar/toggleSnackbar'](false);
    }
  },
  methods: {
    ...mapMutations(['appSnackbar/toggleSnackbar']),
    onClose () {
      this.toggledSnackbar = false;
    },
	},
};
</script>
