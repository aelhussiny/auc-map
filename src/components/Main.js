import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { mapOperations } from '../redux/map';
import { appLangOperations } from '../redux/appLang';
import { viewOperations } from '../redux/view';

import Map from './esri/Map';

import '../styles/Main.scss';

import Loading from './Loading';
import SidePanel from './SidePanel';
import Header from './Header';

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
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

    

    render() {
        let isReverse = '';
        if (this.props.lang.selectedLang === 'ar') {
            isReverse = 'is-reverse';
        }

        return (
            <div className='App'>
                <Header></Header>
                <Loading loaded={this.props.map.loaded} noAnim={false}></Loading>
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
        ...viewOperations
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
