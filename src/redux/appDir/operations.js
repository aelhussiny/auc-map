import actions from "./actions";

const setDir = actions.setDir;

const fetchDir = () => ( dispatch ) => {
  window.api.getAppDir().then(
    response => dispatch(actions.setDir(response)),
    error => dispatch(actions.setDir(error))
  )
}
 
export default {
  setDir,
  fetchDir
};
