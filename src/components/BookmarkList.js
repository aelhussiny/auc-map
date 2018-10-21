import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { appFeatureOperations } from '../redux/appFeatures';

import '../styles/BookmarkList.scss';

import List from './List';

class BookmarkList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
        };
        this.props.setFilter({
            type: "bookmarks"
        });
    }

    render() {
        var isMobile = '';
        if (this.props.isMobile) {
            isMobile = 'is-mobile';
        }
        return (
            <div className="bookmarklist">
                <div className={"listcontainer " + isMobile}>
                    <List />
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => ({
});

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators({
        ...appFeatureOperations
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BookmarkList)
