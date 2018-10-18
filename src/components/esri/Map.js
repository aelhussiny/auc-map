// NOTE
// This is a "special" react component that does not strictly play by
// React's rules.
//
// Conceptually, this component creates a "portal" in React by
// closing its render method off from updates (by simply rendering a div and
// never accepting re-renders) then reconnecting itself to the React lifecycle
// by listening for any new props (using componentWillReceiveProps)

import React, { Component } from 'react';
import { loadModules } from 'esri-loader';
import { createView } from '../../utils/esriLoader';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './Map.css'
import { setTimeout } from 'timers';

class Map extends Component {

  bgExpand = null;
  llExpand = null;

  componentDidMount() {
    this.isAGOL = this.props.config.portalUrl.indexOf("maps.arcgis.com") > -1;
    this.startup(this.props.appConfig.webmapId, this.props.appConfig.mapOptions, this.props.user);
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Tell React to never update this component, that's up to us
    return false;
  }

  componentWillReceiveProps(nextProps) {
      if (this.view && nextProps.lang.selectedLang === 'en') {
          this.view.ui.move("zoom", "top-right");
          this.view.ui.move(this.bgExpand, "top-right");
          this.view.ui.move(this.llExpand, "top-right");
      } else if (this.view && nextProps.lang.selectedLang === 'ar') {
          this.view.ui.move("zoom", "top-left");
          this.view.ui.move(this.bgExpand, "top-left");
          this.view.ui.move(this.llExpand, "top-left");
      }
  }

  render() {
    return (
      <div ref="mapDiv" id="viewContainer" ></div>
    );
  }

  //
  // JSAPI Stuff
  //

  startup = (webmapId, mapOptions, user) => {
    const node = "viewContainer";

    createView(node, webmapId, mapOptions).then(
      result => {
        this.init(result);
        this.setupEventHandlers(this.map);
        this.setupWidgetsAndLayers();
        this.finishedLoading();
      },
      error => {
        console.error("maperr", error);
        setTimeout(()=>{
          this.startup(this.props.appConfig.webmapId, this.props.appConfig.mapOptions, this.props.user);
        }, 1000);
      })
  }

  finishedLoading = () => {
    // Update app state only after map and widgets are loaded
    this.props.onMapLoaded();
  }

  init = (args) => {
    this.view = args.view
    this.map = args.view.map;
    // this.layers = getLayerLookup(webmapInfo.itemInfo.itemData.operationalLayers);
    // this.tables = getTableLookup(webmapInfo.itemInfo.itemData.tables);
    // this.popupHandle = webmapInfo.clickEventHandle;
    // this.popupListener = webmapInfo.clickEventListener;
  }

  setupWidgetsAndLayers() {
    loadModules([
    ])
    .then( ([
    ]) => {
      this.view.ui.move("zoom", "bottom-right");

      window.view = this.view;
      this.view.constraints.rotationEnabled = false;

      this.view.map.allLayers.items.forEach(function(layer) {
        if (layer.title === this.props.config.locationsLayerName) {
          this.locationsLayer = layer;
        }
        layer.popupEnabled = false;
      }.bind(this));

      this.view.on("click", function (event) {
        this.view.hitTest(event).then(function(response){
            response.results.forEach(function(result){
            });
        });
      });

    });
  }

  setupEventHandlers(map) {
    loadModules([
      'dojo/on',
      'dojo/topic'
    ], (
      on,
      topic
    ) => {

      //
      // JSAPI Map Event Handlers go here!
      //

    });
  }
}

const mapStateToProps = state => ({
    config: state.config,
    lang: state.appLang
});

const mapDispatchToProps = function (dispatch) {
  return bindActionCreators({
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps) (Map);
