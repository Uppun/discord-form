import React, { Component } from 'react';
import DiscordForm from './DiscordForm';
import ResultsSwitch from './Results/ResultSwitch';

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
            : <ResultsSwitch formId={this.props.match.params} />;
        return(
            
            <div className='switching-component'>            
                {this.state.editing ? 
                <div className='edit-component'>
                    <button className='results-button' onClick={this.handleResultsClick}>Results</button>
                    {renderedComponent}
                </div> :
                <div className='edit-component'>
                    <button className='edit-button' onClick={this.handleEditClick}>Edit</button>
                    {renderedComponent}
                </div>}
            </div>
        );
    }
} 