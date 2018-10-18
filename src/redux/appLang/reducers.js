import types from "./types";

const initialState = {
  selectedLang: "en",
  strings: {} 
};

const appFeaturesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LANG:
      return {
        ...state,
        selectedLang: action.payload.selectedLang
      }

  case types.SET_STRINGS:
      return {
        ...state,
        strings: action.payload.strings
      }

    default:
      return state;
  }
}

export default appFeaturesReducer;
