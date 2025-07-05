const localState = {
  appMessage: '', // may be a object (depending server's response)
  hasError: false
};

const mutations = {
  setMessage (state, message = '') {
    state.appMessage = message;
  },
  setErrorDialog (state, payload = {}) {
    state.appMessage = payload.appMessage;
    state.hasError = true
  },
  setSuccessDialog (state, payload = {}) {
    state.appMessage = payload.appMessage;
    state.hasError = false
  },
};

export default {
  state: localState,
  mutations,
};
