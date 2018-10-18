import types from './types';

const updateExtent = (extent) => ({
  type: types.UPDATE_EXTENT,
  payload: {
    extent
  }
});

const mapLoaded = () => ({
  type: types.MAP_LOADED,
  payload: {}
});

const setFeatures = (features) => ({
  type: types.SET_FEATURES,
  payload: {
    features
  }
});

export default {
  updateExtent,
  mapLoaded,
  setFeatures
};
