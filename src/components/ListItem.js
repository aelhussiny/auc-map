import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import '../styles/ListItem.scss';

class ListItem extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    highlight(str) {
        if(this.props.highlight && this.props.highlight.length > 0 && str.toLowerCase().includes(this.props.highlight.toLowerCase())) {
            return <span>{str.substring(0, str.toLowerCase().indexOf(this.props.highlight.toLowerCase()))}<span className="highlight">{str.substring(str.toLowerCase().indexOf(this.props.highlight.toLowerCase()), str.toLowerCase().indexOf(this.props.highlight.toLowerCase()) + this.props.highlight.length)}</span>{str.substring(str.toLowerCase().indexOf(this.props.highlight.toLowerCase()) + this.props.highlight.length)}</span>
        } else {
            return str;
        }
    }

    render() {
        var title = this.highlight(this.props.title);
        var subtitle = this.props.subtitle;
        var category = this.props.category;
        var includes = this.props.includes;
        var description = this.props.description;
        var selected = this.props.selected;

        var subtitletag = '';
        if (subtitle && subtitle.length>0 && subtitle !== title) {
            subtitletag = <p className="subtitle">{this.highlight(subtitle)}</p>;
        }

        var descriptiontag = '';
        if (description && description.length > 0) {
            descriptiontag = <p className="description">{description}</p> ;
        }

        var includestag = '';
        if (includes.length > 0) {
            includestag = <p className="includes">{includes.map((fe)=>(<li key={"includes_" + fe.attributes.OBJECTID}>{this.highlight(fe.attributes.NAME)}</li>))}</p>;   
        }

        var isselected = '';
        if (selected) {
            isselected = 'is-selected'
        }

        return (
            <div className={"listitem " + isselected} onClick={() => {this.props.onClick(this.props.feature);}}>
                <div className="listitem-icon">
                    <i className="material-icons">{this.props.config.categories[category].icon}</i>
                </div>
                <div className="listitem-content">
                    <p className="title">{title}</p>
                    {subtitletag}
                    {descriptiontag}
                    {includestag}
                </div>
                <div className="listitem-action">
                    <i className="material-icons">navigate_next</i>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => ({
    config: state.config
});

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators({
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ListItem)