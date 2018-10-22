import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { viewOperations } from '../redux/view';

import { TransitionGroup, CSSTransition } from 'react-transition-group';

import '../styles/SidePanel.scss';

import Search from './Search';
import CategoryList from './CategoryList';
import BookmarkList from './BookmarkList';

class SidePanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: this.props.view.currentView
        };
    }

    render() {

        let isClosed = '';
        if (!this.props.view.isPanelOpen) {
            isClosed = 'is-closed';
        } else {
            isClosed = '';
        }

        let isMobile = '';
        if (this.props.view.isMobile) {
            isMobile = 'is-mobile';
        }

        let titles = {
            "search": "Search",
            "bookmarks": "Bookmarks",
            "list": "Places",
            "directory": "People"
        }

        let contained = <div></div>;
        switch(this.props.view.currentView) {
            case "search":
                contained = <Search />
                break;
            case "list":
                contained = <CategoryList />
                break;
            case "bookmarks":
                contained = <BookmarkList />
                break;
            case "directory":
                contained = <Search />
        }

        return (
            <div className={"panel " + isClosed + " " + isMobile}>

                <div>
                    <section className={"panel__headbar " + isMobile}>
                        <p className="title">{titles[this.props.view.currentView]}</p>
                        <button className="closeButton" onClick={()=>{this.props.togglePanel(false)}}><span className="esri-icon-close"></span></button>
                    </section>
                </div>

                <TransitionGroup component="div" className="transitioner">
                    <CSSTransition
                        key={this.props.view.currentView}
                        timeout={300}
                        classNames='fade'
                    >
                        {contained}
                    </CSSTransition>
                </TransitionGroup>

            </div>
        )
    }
}

const mapStateToProps = state => ({
    view: state.view,
    config: state.config
})

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators({
        ...viewOperations
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps) (SidePanel);
