<template>
  <v-main>
    <transition name="fade-transform" mode="out-in">
      <router-view />
    </transition>
  </v-main>
</template>

<script>
export default {
  name: 'TheLayoutContent',
};
</script>
