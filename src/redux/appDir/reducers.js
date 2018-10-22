import types from "./types";

const initialState = {
  dir: []
};

const appDirReducer = (state = initialState, action) => {
  switch (action.type) {

  case types.SET_DIR:
      return {
        ...state,
        dir: action.payload.dir
      }

    default:
      return state;
  }
}

export default appDirReducer;
