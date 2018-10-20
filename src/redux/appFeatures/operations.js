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
 
export default {
  setFeatures,
  setSelectedFeature,
  setFilter
};
