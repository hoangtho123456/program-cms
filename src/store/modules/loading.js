/* Loading module */
export const LOADING_SHOW = "loadingShow";
export const LOADING_HIDE = "loadingHide";

const localState = {
  loading: false,
};

const mutations = {
  [LOADING_SHOW](state) {
    state.loading = true;
  },
  [LOADING_HIDE](state) {
    state.loading = false;
  }
};

export default {
  state: localState,
  mutations,
};
