import actions from "./actions";

const setFeatures = (features) => ( dispatch ) => {
  dispatch(actions.setFeatures(features));
}

const setSelectedFeature = (feature) => ( dispatch ) => {
  dispatch(actions.setSelectedFeature(feature));
}

const setFilter = (filter) => ( dispatch ) => {
  dispatch(actions.setFilter(filter));
}

const setBookmarks = (bookmarks) => ( dispatch ) => {
  dispatch(actions.setBookmarks(bookmarks));
}
 
export default {
  setFeatures,
  setSelectedFeature,
  setFilter,
  setBookmarks
};
