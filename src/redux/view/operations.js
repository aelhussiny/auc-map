import actions from "./actions";

const setCurrentView = (currentView) => ( dispatch ) => {
    dispatch(actions.setCurrentView(currentView));
}

const togglePanel = (isPanelOpen) => ( dispatch ) => {
    dispatch(actions.panelToggle(isPanelOpen));
}

const setIsMobile = (isMobile) => ( dispatch ) => {
    dispatch(actions.setIsMobile(isMobile));
}

export default {
  setCurrentView,
  togglePanel,
  setIsMobile
};
