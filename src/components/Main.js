import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { mapOperations } from '../redux/map';
import { appLangOperations } from '../redux/appLang';
import { appFeatureOperations } from '../redux/appFeatures';
import { viewOperations } from '../redux/view';
import { loadModules } from 'esri-loader';

import Map from './esri/Map';

import '../styles/Main.scss';

import Loading from './Loading';
import SidePanel from './SidePanel';
import Header from './Header';
import FeatureCard from './FeatureCard';

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        };
        if(!this.props.isMobile) {
            this.props.togglePanel(true);
        }
    }

    switchlang() {
        if (this.props.lang.selectedLang==='en') {
            this.props.setLang("ar");
            document.getElementById("langSwitcher").innerHTML = "English";
        } else {
            this.props.setLang("en");
            document.getElementById("langSwitcher").innerHTML = "العربية";
        }
    }


    componentWillMount() {
        loadModules([
            'esri/tasks/QueryTask',
            'esri/tasks/support/Query',
            'dojo/promise/all',
            'esri/config'
        ]).then(([
            QueryTask,
            Query,
            all,
            esriConfig
        ]) => {
            esriConfig.portalUrl = this.props.appConfig.portalUrl;

            const locationsQT = new QueryTask({
                url: this.props.appConfig.locationsServicePath
            });

            const sublocationsQT = new QueryTask({
                url: this.props.appConfig.sublocationsServicePath
            });

            const getAllQuery = new Query({
                where: "1=1",
                outFields: ["*"],
                orderByFields: ["NAME"],
                returnGeometry: true
            });

            all([
                locationsQT.execute(getAllQuery),
                sublocationsQT.execute(getAllQuery)
            ]).then((results) => {
                const locations = results[0].features;
                locations.forEach(function(location){
                    location.sublocations = [];
                });

                const sublocations = results[1].features;
                sublocations.forEach(function(sublocation) {
                    for(var i=0; i<locations.length; i++) {
                        if (locations[i].attributes.OBJECTID === sublocation.attributes.LOCATIONID) {
                            sublocation.parentLocation = locations[i];
                            locations[i].sublocations.push(sublocation);
                            break;
                        }
                    }
                });

                console.log(locations);
                this.props.setFeatures(locations);

                this.setState({
                    loaded: true
                });
            });
        });
    }
    

    render() {
        let isReverse = '';
        if (this.props.lang.selectedLang === 'ar') {
            isReverse = 'is-reverse';
        }

        return (
            <div className='App'>
                <Header></Header>
                <Loading loaded={this.props.map.loaded && this.state.loaded} noAnim={false}></Loading>
                <div className={'app-content ' + isReverse} style={{height: window.innerHeight - (this.props.isMobile?100:80)}}>
                    <SidePanel />
                    <div className='map-container'>
                        <Map
                            appConfig={this.props.appConfig}
                            mapState={this.props.map}
                            updateExtent={this.props.updateExtent}
                            onMapLoaded={this.props.mapLoaded}
                        />
                    </div>
                    <FeatureCard />
                </div>
                <div className={'lang-switcher ' + isReverse} onClick={this.switchlang.bind(this)} id="langSwitcher" style={{visibility: "hidden"}}>
                    العربية
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    map: state.map,
    view: state.view.currentView,
    isMobile: state.view.isMobile,
    appConfig: state.config,
    lang: state.appLang
})

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators({
        ...mapOperations,
        ...appLangOperations,
        ...viewOperations,
        ...appFeatureOperations
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
