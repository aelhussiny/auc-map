import types from './types';

const setCurrentView = (currentView) => ({
  type: types.VIEW_CHANGE,
  payload: {
    currentView
  }
});

const setListHeight = (heightValue) => ({
  type: types.LIST_HEIGHT_CHANGE,
  payload: {
    heightValue
  }
});

const panelToggle = (isPanelOpen) => ({
  type: types.PANEL_TOGGLE,
  payload: {
    isPanelOpen
  }
});

const setIsMobile = (isMobile) => ({
  type: types.PANEL_SETISMOBILE,
  payload: {
    isMobile
  }
});

export default {
  setCurrentView,
  setListHeight,
  panelToggle,
  setIsMobile
};
