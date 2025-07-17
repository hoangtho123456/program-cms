<template>
  <div>
    <router-view />

    <GlobalMessagePopup />
    <GlobalSnackbar />
    <ConfirmationPopup ref="globalConfirmRef"></ConfirmationPopup>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import GlobalMessagePopup from '@/components/popups/GlobalMessage.vue';
import GlobalSnackbar from '@/components/GlobalSnackbar.vue';
import ConfirmationPopup from '@/components/popups/Confirm.vue';

export default Vue.extend({
  name: "App",
  components: {
    GlobalMessagePopup,
    GlobalSnackbar,
    ConfirmationPopup
  },
  provide () {
    return {
      globalRef: this.$refs
    }
  }
});
</script>
