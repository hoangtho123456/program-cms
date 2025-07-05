<template>
  <!-- <v-img
    :src="src"
    :width="logoSize.width"
    :height="logoSize.height"
    :alt="alt"
  /> -->
  <v-icon :size="logoSize.width" color="primary">fa-brands fa-pied-piper</v-icon>
</template>
<script>
export default {
  name: 'AppLogo',
  props: {
    src: {
      type: String,
      default: 'img/logo.svg',
    },
    width: {
      type: [String, Number],
      default: 100,
    },
    height: {
      type: [String, Number],
      default: 100,
    },
    alt: {
      type: String,
      default: 'Logo',
    },
    small: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    logoSize () {
      if (this.small) {
        return {
          width: 50,
          height: 50,
        }
      }

      return {
        width: this.width,
        height: this.height,
      }
    }
  }
}
</script>
