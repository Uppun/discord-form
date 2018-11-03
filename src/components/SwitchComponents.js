import React, { Component } from 'react';
import DiscordForm from './DiscordForm';
import FullResults from './Results/FullResults';

export default class ComponentManager extends Component {
    state = {
        editing: true,
    }

    handleEditClick = () => {
        this.setState({editing: true});
    }

    handleResultsClick = () => {
        this.setState({editing: false});
    }

    render() {
        const renderedComponent = this.state.editing ? 
            <DiscordForm formId={this.props.match.params} /> 
            : <FullResults formId={this.props.match.params} />;
        return(
            <div className='switching-component'>
            <button className='edit-button' onClick={this.handleEditClick}>Edit</button>
            <button className='results-button' onClick={this.handleResultsClick}>Results</button>  
                {renderedComponent}
            </div>
        );
    }
} 