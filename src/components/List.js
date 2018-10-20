import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { appFeatureOperations } from '../redux/appFeatures';
import { viewOperations } from '../redux/view';

import '../styles/List.scss';
import ReactDOM from 'react-dom';

import ListItem from './ListItem';

class List extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    selectFeature(feature) {
        this.props.setSelectedFeature(feature);
        if (this.props.isMobile) {
            this.props.togglePanel(false);
        }
    }

    render() {
        var features = this.props.features;
        var filter = this.props.filter;
        var listitems = [
        ];
        switch(filter.type) {
            case "search":
                features.forEach((feature) => {
                    var matchesinsub = [];
                    feature.sublocations.forEach(function(sublocation) {
                        if (sublocation.attributes.NAME.toLowerCase().includes(filter.value.toLowerCase())) {
                            matchesinsub.push(sublocation);
                        }
                    });
                    var selected = this.props.selectedFeature && this.props.selectedFeature.attributes.OBJECTID === feature.attributes.OBJECTID;
                    if (matchesinsub.length > 0 || feature.attributes.NAME.toLowerCase().includes(filter.value.toLowerCase()) || feature.attributes.COMMONNAME.toLowerCase().includes(filter.value.toLowerCase())) {
                        listitems.push(<ListItem selected={selected} key={"listitem_feature_"+feature.attributes.OBJECTID} feature={feature} highlight={filter.value} title={feature.attributes.NAME} subtitle={feature.attributes.COMMONNAME} category={feature.attributes.CATEGORY} description={feature.attributes.DESCR} includes={matchesinsub} onClick={this.selectFeature.bind(this)} />);
                    }
                });
                break;
        }
        return (
            <div className="list">
                {listitems}
            </div>
        );
    }

    componentDidUpdate() {
        if (this.props.selectedFeature) {
            let selectedCardDomNode;
            selectedCardDomNode = ReactDOM.findDOMNode(this).getElementsByClassName('listitem is-selected')[0];
            if(typeof selectedCardDomNode != "undefined") {
                ReactDOM.findDOMNode(this).scrollTop = selectedCardDomNode.offsetTop - 200;
            }
        }
    }

}

const mapStateToProps = state => ({
    features: state.features.features,
    selectedFeature: state.features.selectedFeature,
    filter: state.features.filter,
    isMobile: state.view.isMobile
});

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators({
        ...appFeatureOperations,
        ...viewOperations
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(List)