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

import { appFeatureOperations } from '../../redux/appFeatures';
import { viewOperations } from '../../redux/view';

class Map extends Component {

  componentDidMount() {
    this.isAGOL = this.props.config.portalUrl.indexOf("maps.arcgis.com") > -1;
    this.startup(this.props.appConfig.webmapId, this.props.appConfig.mapOptions, this.props.user);
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Tell React to never update this component, that's up to us
    return false;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedFeature !== nextProps.selectedFeature) {
      this.newSelect(nextProps.selectedFeature);
    }
  }

  render() {
    return (
      <div ref="mapDiv" id="viewContainer" ></div>
    );
  }

  newSelect(feature) {
    this.view.graphics.removeAll();
    if(feature) {
      console.log("Selected feature is", feature.attributes.NAME);
      var graphic = {
        geometry: feature.geometry,
        attributes: feature.attributes,
        symbol: {
          type: "simple-fill",  // autocasts as new SimpleFillSymbol()
          style: "none",
          outline: {  // autocasts as new SimpleLineSymbol()
            color: [255, 0, 0, 1],
            width: "2px"
          }
        }
      };
      this.view.graphics.add(graphic);
      this.view.goTo({target: graphic, zoom: this.view.zoom});
    }
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
        console.warn("Map Error:", error);
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
      if(this.props.isMobile) {
        this.view.extent = {"spatialReference":{"latestWkid":3857,"wkid":102100},"xmin":3506040.620998138,"ymin":3504230.984919316,"xmax":3507832.1138486187,"ymax":3507632.432678096};
      }

      this.view.map.allLayers.items.forEach(function(layer) {
        if (layer.title === this.props.config.locationsLayerName) {
          this.locationsLayer = layer;
        }
        layer.popupEnabled = false;
      }.bind(this));

      this.view.on("click", function (event) {
        this.view.hitTest(event).then(function(response){
            response.results.forEach(function(result){
              if(result.graphic.layer.title === this.props.config.locationsLayerName) {
                this.props.setSelectedFeature(this.props.features.filter((a)=>(a.attributes.OBJECTID === result.graphic.attributes.OBJECTID))[0]);
              }
            }.bind(this));
        }.bind(this));
      }.bind(this));
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
    features: state.features.features,
    selectedFeature: state.features.selectedFeature,
    config: state.config,
    lang: state.appLang,
    view: state.view.currentView,
    isMobile: state.view.isMobile
});

const mapDispatchToProps = function (dispatch) {
  return bindActionCreators({
    ...appFeatureOperations,
    ...viewOperations
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps) (Map);
