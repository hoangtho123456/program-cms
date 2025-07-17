import Vue from 'vue';

export default Vue.extend({
  data () {
    return {
      requestQuery: {
        sortByKey: 'id',
        page: 1,
        limit: 10
      }
    }
  },
  computed: {
    mixinQuery ():Objects.IRequestQuery {
      return { ...this.requestQuery };
    }
  },
  methods: {
    updateApiQuery (extra:object | NoneValue = {}): void {
      this.requestQuery = {
        ...this.requestQuery,
        ...extra
      }
    },
    deleteQueryParam (key:string): void {
      delete this.requestQuery[key as keyof Objects.IRequestQuery];
    }
  }
});
