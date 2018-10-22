import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { appFeatureOperations } from '../redux/appFeatures';

import '../styles/Search.scss';

import TextField from 'material-ui/TextField';
import List from './List';

class Search extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            query: ""
        };
        this.props.setFilter({
            type: "search",
            value: ""
        });
    }

    change_query = (e, newVal) => {
        this.setState({
            query: newVal
        });
        this.props.setFilter({
            type: "search",
            value: newVal
        });
    }

    clearSearch = () => {
        this.change_query(null, "");
    }

    render() {
        return (
            <div className="search">
                <div className="searchbarpanel">
                    <TextField style={{zIndex: 0, marginBottom: "10px"}} id="search-field" inputStyle={{color: "black", fontSize: "12pt"}} underlineStyle={{borderColor:"#0D3960"}} underlineFocusStyle={{borderColor: "#0D3960"}} placeholder="Search" style={{fontFamily: "'Abel', sans-serif"}} fullWidth={true} value={this.state.query} type="text" onChange={this.change_query.bind(this)} />
                    <span className="clearbtn" onClick={this.clearSearch.bind(this)}>
                        <svg className="clearbtnicon" viewBox="0 0 24 24">
                            <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                        </svg>
                    </span>
                </div>
                <List />
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

export default connect(mapStateToProps, mapDispatchToProps)(Search)
