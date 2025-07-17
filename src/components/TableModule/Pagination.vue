<template>
  <div class="d-flex align-center flex-column">
    <div v-if="limit > 0" class="mb-2">
      <span class="text-capitalize">{{ $t('common.pagination.show') }} </span>

      <span class="mx-1 secondary--text">
        {{ `${itemRange.startItem}-${itemRange.endItem}` }}
      </span>

      <span>
        {{ $t('common.pagination.itemsOf') }}
        <span class="primary--text">
          {{ amount }}
        </span>
        &nbsp; {{ $t('common.pagination.itemsInPage') }}
      </span>
    </div>

    <div class="t-paginations d-flex align-center">
      <Page v-model="page" :page-count="totals"></Page>
    </div>
  </div>
</template>
<script>
import Page from "./Page.vue";
export default {
  components: { Page },
  props: {
    totals: {
      type: Number,
      default: 1,
    },
    amount: {
      type: Number,
      default: 0,
    },
    limit: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      noEmit: false,
      page: 1,
    };
  },
  computed: {
    itemRange () {
      console.log(this.page, this.limit);
      const start = (this.page - 1) * this.limit + 1;
      const end = Math.min(this.page * this.limit, this.amount);

      return {
        startItem: start,
        endItem: end,
      };
    },
  },
  watch: {
    page(val) {
      if (this.noEmit) {
        this.noEmit = false;
      } else {
        this.$emit("onChangePagination", val);
      }
    },
  },
  methods: {
    setPage(val) {
      this.page = val;
      this.noEmit = true;
    },
  },
};
</script>
