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
        if (feature) {
            this.props.setSelectedFeature(feature);
            if (this.props.isMobile) {
                this.props.togglePanel(false);
            }
        }
    }

    selectCategory(category) {
        this.props.setFilter({
            type: "category",
            value: category
        });
    }

    render() {
        var features = this.props.features;
        var filter = this.props.filter;
        var listitems = [
        ];
        switch(filter.type) {
            case "search":
                if(this.props.currentView === "search") {
                    features.forEach((feature) => {
                        var matchesinsub = [];
                        feature.sublocations.forEach(function(sublocation) {
                            if (sublocation.attributes.NAME.toLowerCase().includes(filter.value.toLowerCase())) {
                                matchesinsub.push(sublocation);
                            }
                        });
                        var selected = this.props.selectedFeature && this.props.selectedFeature.attributes.OBJECTID === feature.attributes.OBJECTID;
                        if (matchesinsub.length > 0 || feature.attributes.NAME.toLowerCase().includes(filter.value.toLowerCase()) || feature.attributes.COMMONNAME.toLowerCase().includes(filter.value.toLowerCase())) {
                            listitems.push(<ListItem bookmarkable={true} selected={selected} key={"listitem_feature_"+feature.attributes.OBJECTID} feature={feature} highlight={filter.value} title={feature.attributes.NAME} subtitle={feature.attributes.COMMONNAME} category={feature.attributes.CATEGORY} description={feature.attributes.DESCR} includes={matchesinsub} onClick={this.selectFeature.bind(this)} />);
                        }
                    });
                } else if (this.props.currentView === "directory" && this.props.filter.value && this.props.filter.value.length > 0) {
                    this.props.dir.forEach((person, personIndex)=> {
                        var toShow = person.name.toLowerCase().indexOf(filter.value.toLowerCase()) > -1;
                        toShow = toShow || person.department.toLowerCase().indexOf(filter.value.toLowerCase()) > -1;
                        toShow = toShow || person.phone.toLowerCase().indexOf(filter.value.toLowerCase()) > -1;
                        toShow = toShow || person.building.toLowerCase().indexOf(filter.value.toLowerCase()) > -1;
                        toShow = toShow || person.room.toLowerCase().indexOf(filter.value.toLowerCase()) > -1;
                        if (toShow) {
                            var location = "";
                            var feature = undefined;
                            if (person.room && person.room.length > 0) {
                                location += person.room
                            }
                            if (person.building && person.building.length > 0) {
                                if(location.length > 0) {
                                    location += ", ";
                                }
                                location += person.building;
                                feature = features.filter((a)=>(a.attributes.NAME === person.building))[0];
                            }
                            if (person.campus && person.campus.length > 0) {
                                if(location.length > 0) {
                                    location += ", ";
                                }
                                location += person.campus;
                            }
                            var phone = [];
                            if (person.phone && person.phone.length > 0) {
                                var phone = person.phone;
                                if(person.phone.indexOf("/") > -1) {
                                    phone = phone.substring(0,phone.indexOf("/"));
                                }
                                if (person.campus === "AUC New Cairo") { 
                                    phone = "022615" + phone;
                                }
                                phone = <a className={"listitem-link"} href={"tel:"+phone}>{phone}</a>;
                                phone = [{"attributes":{"OBJECTID":personIndex,"NAME":phone}}];
                            }
                            listitems.push(<ListItem highlight={filter.value} includes={phone} key={"listitem_directory_"+personIndex} feature={feature} title={person.name} subtitle={person.title + ", " + person.department} notactionable={!feature} onClick={this.selectFeature.bind(this)} description={location}  category={"PERSON"} />);
                        }
                    });
                }
                break;
            case "category":
                if (filter.value.length === 0) {
                    var categoryIDs = Object.keys(this.props.config.categories);
                    categoryIDs.forEach(function(categoryID){
                        var category = this.props.config.categories[categoryID];
                        if (category.include) {
                            listitems.push(<ListItem feature={categoryID} selected={false} key={"listitem_category_"+categoryID} title={category.name} category={categoryID} onClick={this.selectCategory.bind(this)} />)
                        }
                    }.bind(this));
                } else {
                    var sublocations = [];
                    features.forEach(function(feature){
                        sublocations = [
                            ...sublocations,
                            ...feature.sublocations
                        ]
                    });
                    features = [
                        ...features,
                        ...sublocations
                    ];
                    features = features.sort(function(a, b) {
                        if (a.attributes && b.attributes) {
                            return ( a.attributes.NAME < b.attributes.NAME) ? -1 : ( a.attributes.NAME > b.attributes.NAME) ? 1 : 0;
                        } else {
                            return -1;
                        }
                    });
                    features.forEach(function(feature, featureIndex){
                        if (feature.attributes.CATEGORY === filter.value) {
                            var selected = this.props.selectedFeature;
                            if(feature.parentLocation) {
                                selected = selected && this.props.selectedFeature.attributes.OBJECTID === feature.parentLocation.attributes.OBJECTID;
                                selected = selected && this.props.selectedFeature.attributes.NAME === feature.parentLocation.attributes.NAME;
                            } else {
                                selected = selected && this.props.selectedFeature.attributes.OBJECTID === feature.attributes.OBJECTID;
                            }
                            listitems.push(<ListItem bookmarkable={!feature.parentLocation} feature={feature.parentLocation?feature.parentLocation:feature} selected={selected} key={"listitem_feature_"+featureIndex} title={feature.attributes.NAME} description={feature.attributes.DESCR} subtitle={feature.attributes.COMMONNAME} category={feature.attributes.CATEGORY} onClick={this.selectFeature.bind(this)} />)
                        }
                    }.bind(this));
                }
                break;
            case "bookmarks":
                if(localStorage.getItem("bookmarks")) {
                    features.forEach(function(feature){
                        if(JSON.parse(localStorage.getItem("bookmarks")).indexOf(feature.attributes.OBJECTID) > -1) {
                            var selected = selected && this.props.selectedFeature.attributes.OBJECTID === feature.attributes.OBJECTID;
                            listitems.push(<ListItem bookmarkable={true} feature={feature} selected={selected} key={"listitem_bookmark_"+feature.attributes.OBJECTID} title={feature.attributes.NAME} category={feature.attributes.CATEGORY} onClick={this.selectFeature.bind(this)} description={feature.attributes.DESCR} subtitle={feature.attributes.COMMONNAME} includes={feature.sublocations} />)
                        }
                    }.bind(this));
                }
                break;
        }

        var contained = listitems;
        if (listitems.length === 0){
            contained = <div style={{textAlign: "center"}}><h2>Oh, no!</h2>Seems like we couldn't find what you're looking for. Please try something different.</div>;
            if (filter.type === "bookmarks") {
                contained = <div style={{textAlign: "center"}}><h2>Start Bookmarking!</h2>Seems like you don't have any bookmarks yet. Start bookmarking places to see them on this list.</div>;                
            }
        }

        return (
            <div className="list">
                {contained}
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
    isMobile: state.view.isMobile,
    config: state.config,
    bookmarks: state.features.bookmarks,
    currentView: state.view.currentView,
    dir: state.appDir.dir
});

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators({
        ...appFeatureOperations,
        ...viewOperations
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(List)