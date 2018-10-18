import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { appLangOperations } from '../redux/appLang';
import { viewOperations } from '../redux/view';

import '../styles/Header.scss';
import logo from '../images/logo.png';
import smalllogo from '../images/smalllogo.png';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
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

    setView(view) {
        if (!this.props.view.isPanelOpen) {
            this.props.togglePanel(true);
            this.props.setCurrentView(view);
        } else {
            if (this.props.view.currentView === view) {
                this.props.togglePanel(false);
            } else {
                this.props.setCurrentView(view);
            }
        }
    }    

    render() {
        let isReverse = '';
        if (this.props.lang.selectedLang === 'ar') {
            isReverse = 'is-reverse';
        }

        let isMobile = '';
        let src = logo;
        let links = <div className="navlinks"><a onClick={()=>{this.setView("search")}}>Search</a> | <a onClick={()=>{this.setView("bookmarks")}}>Bookmarks</a> | <a onClick={()=>{this.setView("list")}}>List</a> | <a onClick={()=>{this.setView("directory")}}>Directory</a></div>;
        let buttonjson = [
            {
                id: "search",
                view: "search",
                icon: "search"
            },
            {
                id: "bookmark",
                view: "bookmark",
                icon: "bookmark"
            },
            {
                id: "list",
                view: "list",
                icon: "layer-list"
            },
            {
                id: "directory",
                view: "directory",
                icon: "user"
            }
        ];

        let buttontags = [];
        buttonjson.forEach(function(singlebutton) {
            buttontags.push(<button key={"navbutton_"+singlebutton.id} className={this.props.view.isPanelOpen && this.props.view.currentView === singlebutton.view?"active":""} onClick={()=>this.setView(singlebutton.view)}><span className={"esri-icon-" + singlebutton.icon}></span></button>);
        }.bind(this));
        
        let buttons =   <div className="navbuttons">
                            {buttontags}
                        </div>;
        let nav = links;
        if (this.props.view.isMobile) {
            isMobile = 'is-mobile';
            src = smalllogo;
            nav = buttons;
        }

        return (
            <div className={"header " + isMobile}>
                <div className={"navigationtoolbar " + isMobile}>
                    <img src={src} height={this.props.view.isMobile?"50":"65"} style={{marginTop: this.props.view.isMobile?5:8}} />
                </div>
                <div className={"sidepaneltoolbar" + isMobile}>
                    {nav}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    map: state.map,
    view: state.view,
    appConfig: state.config,
    lang: state.appLang
})

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators({
        ...appLangOperations,
        ...viewOperations
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
