import types from "./types";

const initialState = {
  features: [],
  selectedFeature: null,
  filter: {
    type: "",
    value: ""
  },
  bookmarks: []
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

  case types.SET_BOOKMARKS:
      return {
        ...state,
        bookmarks: action.payload.bookmarks
      }

    default:
      return state;
  }
}

export default appFeaturesReducer;
