import types from "./types";

const initialState = {
    currentView: "search",
    listHeight: 0,
    isPanelOpen: false,
    isMobile: false
};

const viewChangeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.VIEW_CHANGE:
        return {
            ...state,
            currentView: action.payload.currentView
        }

    case types.LIST_HEIGHT_CHANGE:
        return {
            ...state,
            listHeight: action.payload.heightValue
        }

    case types.PANEL_TOGGLE:
        return {
            ...state,
            isPanelOpen: action.payload.isPanelOpen
        }

    case types.PANEL_SETISMOBILE:
        return {
            ...state,
            isMobile: action.payload.isMobile
        }

    default:
        return state;
  }
}

export default viewChangeReducer;
