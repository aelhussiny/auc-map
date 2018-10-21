import types from './types';

const setFeatures = (features) => ({
  type: types.SET_FEATURES,
  payload: {
    features: features
  }
});

const setSelectedFeature = (selectedFeature) => ({
  type: types.SET_SELECTED_FEATURE,
  payload: {
    selectedFeature: selectedFeature
  }
});

const setFilter = (filter) => ({
  type: types.SET_FILTER,
  payload: {
    filter: filter
  }
});

const setBookmarks = (bookmarks) => ({
  type: types.SET_BOOKMARKS,
  payload: {
    bookmarks: bookmarks
  }
});

export default {
  setFeatures,
  setSelectedFeature,
  setFilter,
  setBookmarks
};
