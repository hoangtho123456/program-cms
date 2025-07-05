export default {
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
    mixinQuery () {
      return this.requestQuery || {};
    }
  },
  methods: {
    updateApiQuery (extra = null) {
      this.requestQuery = {
        ...this.requestQuery,
        ...extra
      }
    },
    deleteQueryParam (key) {
      delete this.requestQuery[key];
    }
  }
};
