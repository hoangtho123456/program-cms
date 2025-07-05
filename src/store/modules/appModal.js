const localState = {
  modalMessage: '', // may be a object (depending server's response)
  hasError: false
};

const mutations = {
  setMessage (state, message = '') {
    state.modalMessage = message;
  },
  setErrorModal (state, payload = {}) {
    state.modalMessage = payload.modalMessage;
    state.hasError = true
  },
  setSuccessModal (state, payload = {}) {
    state.modalMessage = payload.modalMessage;
    state.hasError = false
  },
};

export default {
  state: localState,
  mutations,
};
