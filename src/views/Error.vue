<template>
  <app-center>
    <template v-slot:page>
      <h1 class="display-2 primary--text">
        {{ `${$t('errors.whoops')}, ${errorCode}` }}
      </h1>
      <p>{{ $t(`errors.${errorCode}`) }}</p>
      <v-btn
        outlined
        color="primary"
        @click="$router.push('/')"
      >
        {{ $t('errors.back') }}
      </v-btn>
    </template>
  </app-center>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

export default Vue.extend({
  name: 'ErrorPage',
  props: {
    errorCode: {
      type: Number as PropType<number>,
      default: 404,
    },
  },
  data: () => ({}),
});
</script>
