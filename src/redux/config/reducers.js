import types from "./types";

const initialState = {
  loaded: false
}

const configReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_CONFIG:
      return {
        ...state,
        ...action.payload.config,
        loaded: true
      }
    default:
      return state;
  }
}

export default configReducer;
