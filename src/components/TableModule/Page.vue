<template>
  <ul :class="`d-flex align-center pl-0 ${paginationClasses.ul}`">
    <li :class="`${paginationClasses.li} ${hasFirst ? paginationClasses.liDisable : ''}`">
      <v-btn fab x-small class="btn-white elevation-3" @click="first" :disabled="hasFirst">
        <v-icon size="1rem">fas fa-step-backward</v-icon>
      </v-btn>
    </li>

    <li :class="`${paginationClasses.li} ${hasFirst ? paginationClasses.liDisable : ''}`">
      <v-btn fab x-small class="btn-white elevation-3 mx-2" @click="prev" :disabled="hasFirst">
        <v-icon size="1rem">fas fa-chevron-left</v-icon>
      </v-btn>
    </li>

    <li v-for="page in items" :key="page.label" :class="`${paginationClasses.li} ${page.active ? paginationClasses.liActive : ''} ${page.disable ? paginationClasses.liDisable : ''}`">
      <span v-if="page.disable" :class="`mx-2 ${paginationClasses.button} ${paginationClasses.buttonDisable}`"> ... </span>
      <v-btn v-else fab small :color="page.active ? 'primary' : 'transparent'" class="elevation-3" @click="goto(page.label)" :class="`mx-2 ${paginationClasses.button} ${page.active ? paginationClasses.buttonActive : ''}`">
        {{ page.label }}
      </v-btn>
    </li>

    <li :class="`${paginationClasses.li} ${hasLast ? paginationClasses.liDisable : ''}`">
      <v-btn fab x-small class="btn-white elevation-3 mx-2" @click="next" :disabled="hasLast">
        <v-icon size="1rem">fas fa-chevron-right</v-icon>
      </v-btn>
    </li>

    <li :class="`${paginationClasses.li} ${hasLast ? paginationClasses.liDisable : ''}`">
      <v-btn fab x-small class="btn-white elevation-3" @click="last" :disabled="hasLast">
        <v-icon size="1rem">fas fa-step-forward</v-icon>
      </v-btn>
    </li>
  </ul>
</template>

<script>
const defaultClasses = {
  ul: 'pagination',
  li: 'pagination-item',
  liActive: 'pagination-item--active',
  liDisable: 'pagination-item--disable',
  button: 'pagination-link',
  buttonActive: 'pagination-link--active',
  buttonDisable: 'pagination-link--disable',
};

export default {
  props: {
    value: {
      // current page
      type: Number,
      required: true,
    },
    pageCount: {
      // page numbers
      type: Number,
      required: true,
    },
    classes: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    labels: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },

  data() {
    return {
      paginationClasses: {
        ...defaultClasses,
        ...this.classes,
      },
    };
  },

  mounted() {
    if (this.value > this.pageCount) {
      this.$emit('input', this.pageCount);
    }
  },

  computed: {
    items() {
      let valPrev = this.value > 1 ? this.value - 1 : 1; // for easier navigation - gives one previous page
      let valNext = this.value < this.pageCount ? this.value + 1 : this.pageCount; // one next page
      let extraPrev = valPrev === 3 ? 2 : null;
      let extraNext = valNext === this.pageCount - 2 ? this.pageCount - 1 : null;
      let dotsBefore = valPrev > 3 ? 2 : null;
      let dotsAfter = valNext < this.pageCount - 2 ? this.pageCount - 1 : null;

      let output = [];

      for (let i = 1; i <= this.pageCount; i += 1) {
        if ([1, this.pageCount, this.value, valPrev, valNext, extraPrev, extraNext, dotsBefore, dotsAfter].includes(i)) {
          output.push({
            label: i,
            active: this.value === i,
            disable: [dotsBefore, dotsAfter].includes(i),
          });
        }
      }

      return output;
    },

    hasFirst() {
      return this.value === 1;
    },

    hasLast() {
      return this.value === this.pageCount;
    },
  },

  watch: {
    value: function () {
      this.$emit('change');
    },
  },

  methods: {
    first() {
      if (!this.hasFirst) {
        this.$emit('input', 1);
      }
    },

    prev() {
      if (!this.hasFirst) {
        this.$emit('input', this.value - 1);
      }
    },

    goto(page) {
      this.$emit('input', page);
    },

    next() {
      if (!this.hasLast) {
        this.$emit('input', this.value + 1);
      }
    },

    last() {
      if (!this.hasLast) {
        this.$emit('input', this.pageCount);
      }
    },
  },
};
</script>
<style lang="scss">
.btn-white {
  background-color: #fff !important;
}
.pagination {
  list-style: none;
}
.pagination-item {
  .pagination-link {
    font-size: 1rem;
  }
}
</style>
