import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import '../styles/Loading.scss';

const iconStyle = {
    width: '100px',
    height: '100px',
    fill: 'white',
    marginTop: window.innerHeight/2 - 50 + 'px'
}

let animStyle = {
    animation: 'rotate 2s ease-in-out infinite'
}

const containerStyle = {
    height: '100%'
}

class Loading extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: this.props.loaded
        };
    }

    render() {
        let hide = '';
        if (this.props.loaded) {
            hide = 'is-loaded';
        }

        if (this.props.noAnim) {
            animStyle = {};
        } else {
            animStyle = {
                animation: 'rotate 2s ease-in-out infinite'
            }
        }

        return (
            <div className={"loading " + hide}>
                <div className="loading__container" style={containerStyle}>
                    <svg className="loading__icon" style={{...iconStyle, ...animStyle}} viewBox="0 0 24 24">
                        <path d="M7,17L10.2,10.2L17,7L13.8,13.8L7,17M12,11.1A0.9,0.9 0 0,0 11.1,12A0.9,0.9 0 0,0 12,12.9A0.9,0.9 0 0,0 12.9,12A0.9,0.9 0 0,0 12,11.1M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z" />
                    </svg>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    view: state.view
})

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators({
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
