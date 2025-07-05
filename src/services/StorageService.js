const Storage = {
  async autoLoad(state) {
    try {
      const result = await state.loader.call(null, "limit=-1");
      if (result.error) {
        state.touched = false;
      } else {
        state.list = result.list || result;
      }
    } catch (error) {
      state.touched = true;
    }
  },
};

export default Storage;
