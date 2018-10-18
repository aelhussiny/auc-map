import actions from "./actions";

const fetchConfig = () => ( dispatch ) => {
  window.api.getAppConfig().then(
    response => dispatch(actions.setConfig(response)),
    error => dispatch(actions.setConfig(error))
  )
}

export default {
  fetchConfig
};
