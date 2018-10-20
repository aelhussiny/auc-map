import types from "./types";

const initialState = {
  features: [],
  selectedFeature: null,
  filter: {
    type: "",
    value: ""
  }
};

const appFeaturesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_FEATURES:
      return {
        ...state,
        features: action.payload.features
      }

  case types.SET_SELECTED_FEATURE:
      return {
        ...state,
        selectedFeature: action.payload.selectedFeature
      }
  
  case types.SET_FILTER:
      return {
        ...state,
        filter: action.payload.filter
      }

    default:
      return state;
  }
}

export default appFeaturesReducer;
