import types from './types';

const setLang = (lang) => ({
  type: types.SET_LANG,
  payload: {
    selectedLang: lang
  }
});

const setStrings = (strings) => ({
  type: types.SET_STRINGS,
  payload: {
    strings: strings
  }
});

export default {
  setLang,
  setStrings
};
