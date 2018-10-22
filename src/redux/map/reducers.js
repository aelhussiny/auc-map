import types from "./types";

const initialState = {
  loaded: false,
  currentExtent: null,
  features: []
};

const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.REHYDRATE:
      return {
        ...state,
        currentExtent: action.payload.map ? action.payload.map.currentExtent : initialState.currentExtent,
      }
    case types.UPDATE_EXTENT:
      return {
        ...state,
        currentExtent: action.payload.extent
      }
    case types.MAP_LOADED:
      return {
        ...state,
        loaded: true
      }

    case types.SET_FEATURES:
      return {
        ...state,
        features: action.payload.features
      }


    default:
      return state;
  }
}

export default mapReducer;
