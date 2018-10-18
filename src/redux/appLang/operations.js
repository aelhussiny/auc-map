import actions from "./actions";

const setLang = actions.setLang;

const fetchStrings = () => ( dispatch ) => {
  window.api.getAppStrings().then(
    response => dispatch(actions.setStrings(response)),
    error => dispatch(actions.setStrings(error))
  )
}
 
export default {
  setLang,
  fetchStrings
};
