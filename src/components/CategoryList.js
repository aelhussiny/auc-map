import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { appFeatureOperations } from '../redux/appFeatures';

import '../styles/CategoryList.scss';

import List from './List';

class CategoryList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
        };
        this.allCategories();
    }

    allCategories() {
        this.props.setFilter({
            type: "category",
            value: ""
        });
    }

    render() {
        var isMobile = '';
        if (this.props.isMobile) {
            isMobile = 'is-mobile';
        }
        var categorybar;
        if (this.props.filter.value.length > 0) {
            categorybar =
            <div className={"categorybar " + isMobile} onClick={this.allCategories.bind(this)}>
                <span className="esri-icon-left backbutton"></span> {this.props.config.categories[this.props.filter.value].name}
            </div>;
        }
        return (
            <div className="categorylist">
                {categorybar}
                <div className={"listcontainer " + isMobile}>
                    <List style={{margin: "10px"}} />
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => ({
    filter: state.features.filter,
    isMobile: state.view.isMobile,
    config: state.config
});

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators({
        ...appFeatureOperations
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)
