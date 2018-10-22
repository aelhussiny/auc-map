import types from './types';

const setConfig = (config) => ({
  type: types.SET_CONFIG,
  payload: {
    config
  }
});

export default {
  setConfig
};
