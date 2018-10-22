import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { configOperations } from '../redux/config';
import { appLangOperations } from '../redux/appLang';
import { viewOperations } from '../redux/view';
import { appDirOperations } from '../redux/appDir';

import Loading from './Loading';
import Main from './Main';
import { bootstrapJSAPI } from '../utils/esriLoader';

import '../styles/App.scss';

class App extends Component {

  componentWillMount() {
    this.props.fetchConfig();
    this.props.fetchStrings();
    this.props.fetchDir();
    window.addEventListener('resize', this.checkScreen.bind(this));
    this.checkScreen();
  }

  checkScreen() {
    if(window.innerWidth < 500) {
      this.props.setIsMobile(true);
    } else {
      this.props.setIsMobile(false);
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.appConfig && nextProps.appConfig.loaded) {
      bootstrapJSAPI(nextProps.appConfig.portalUrl, nextProps.appConfig.jsapiUrl, nextProps.appConfig.jsapiV4)
    }
  }
  render() {
    // We'll use these to determine what state the app is in
    const configLoaded = this.props.appConfig.loaded;
    if (!configLoaded) {
      return (
          <div>
              <Loading loaded={false} noAnim={true}></Loading>
          </div>
      )
    }
    return <Main />
  }
}

const mapStateToProps = state => ({
  appConfig: state.config
})

const mapDispatchToProps = function (dispatch) {
  return bindActionCreators({
    ...configOperations,
    ...appLangOperations,
    ...viewOperations,
    ...appDirOperations
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
