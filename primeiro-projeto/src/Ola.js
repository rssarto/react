import React, {Component} from 'react';

class Ola extends Component {
    render(){
        return(
            <span>Olá {this.props.name}</span>
        )
    }
}

export default Ola