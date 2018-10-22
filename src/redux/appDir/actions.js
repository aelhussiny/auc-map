import types from './types';

const setDir = (dir) => ({
  type: types.SET_DIR,
  payload: {
    dir: dir.sort(function(a, b){
      return ( a.name < b.name) ? -1 : ( a.name > b.name) ? 1 : 0;
    })
  }
});

export default {
  setDir
};
