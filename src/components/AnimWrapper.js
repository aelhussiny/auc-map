import React, { Component } from 'react';

class AnimWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEntering: false,
            didEnter: false
        };
    }

    render() {
        return (
            <div className="anim">
                {this.props.children}
            </div>
        )
    }
}

export default AnimWrapper;
