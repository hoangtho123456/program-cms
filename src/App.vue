<template>
  <div>
    <router-view />

    <GlobalMessagePopup />

    <GlobalSnackbar />

    <ConfirmationPopup ref="globalConfirmRef"></ConfirmationPopup>
  </div>
</template>
<script>
import GlobalMessagePopup from '@/components/popups/GlobalMessage.vue';
import GlobalSnackbar from '@/components/GlobalSnackbar.vue';
import ConfirmationPopup from '@/components/popups/Confirm.vue';

export default {
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
};
</script>
