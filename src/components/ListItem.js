import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import '../styles/ListItem.scss';

import { appFeatureOperations } from '../redux/appFeatures';

class ListItem extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    highlight(str) {
        if(this.props.highlight && this.props.highlight.length > 0 && str.toLowerCase && str.toLowerCase().includes(this.props.highlight.toLowerCase())) {
            return <span>{str.substring(0, str.toLowerCase().indexOf(this.props.highlight.toLowerCase()))}<span className="highlight">{str.substring(str.toLowerCase().indexOf(this.props.highlight.toLowerCase()), str.toLowerCase().indexOf(this.props.highlight.toLowerCase()) + this.props.highlight.length)}</span>{str.substring(str.toLowerCase().indexOf(this.props.highlight.toLowerCase()) + this.props.highlight.length)}</span>
        } else {
            return str;
        }
    }

    toggleBookmark(ID) {
        if(localStorage.getItem("bookmarks")) {
            var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
            if(bookmarks.indexOf(ID) > -1) {
                bookmarks.splice(bookmarks.indexOf(ID), 1);
            } else {
                bookmarks.push(ID);
            }
        } else {
            var bookmarks = [ID];
        }
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
        this.forceUpdate();
        this.props.setBookmarks(bookmarks);
    }

    render() {
        var title = this.highlight(this.props.title);
        var subtitle = this.props.subtitle;
        var category = this.props.category;
        var includes = this.props.includes;
        var description = this.props.description;
        var selected = this.props.selected;
        var bookmarkable = this.props.bookmarkable;

        var subtitletag = '';
        if (subtitle && subtitle.length>0 && subtitle !== title) {
            subtitletag = <p className="subtitle">{this.highlight(subtitle)}</p>;
        }

        var descriptiontag = '';
        if (description && description.length > 0) {
            descriptiontag = <p className="description">{description}</p> ;
        }

        var includestag = '';
        if (includes && includes.length > 0) {
            includestag = <p className="includes">{includes.map((fe)=>(<li key={"includes_" + fe.attributes.OBJECTID}>{this.highlight(fe.attributes.NAME)}</li>))}</p>;   
        }

        var isselected = '';
        if (selected) {
            isselected = 'is-selected'
        }

        var bookmarktag = '';
        if (bookmarkable) {
            var bookmarkicon = "bookmark_border";
            if (this.props.feature) {
                if(localStorage.getItem("bookmarks")) {
                    if(JSON.parse(localStorage.getItem("bookmarks")).indexOf(this.props.feature.attributes.OBJECTID) > -1) {
                        bookmarkicon = "bookmark";
                    }
                }
            }
            bookmarktag = <span className="material-icons listitem-bookmarkicon" onClick={(e) => {e.stopPropagation();this.toggleBookmark(this.props.feature.attributes.OBJECTID);}}>{bookmarkicon}</span>;
        }

        var notactionableclass = '';
        var actiontag = <i className="material-icons">navigate_next</i>;
        if(this.props.notactionable) {
            actiontag = '';
            notactionableclass = 'not-actionable';
        }

        return (
            <div className={"listitem " + isselected} onClick={() => {if(this.props.onClick){this.props.onClick(this.props.feature);}}}>
                <div className="listitem-icon">
                    <i className="material-icons">{this.props.config.categories[category].icon}</i>
                </div>
                <div className="listitem-content">
                    <p className="title">{title}</p>
                    {subtitletag}
                    {descriptiontag}
                    {includestag}
                </div>
                <div className={"listitem-action " + notactionableclass}>
                    {actiontag}
                    {bookmarktag}
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => ({
    config: state.config,
    bookmarks: state.features.bookmarks
});

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators({
        ...appFeatureOperations
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ListItem)