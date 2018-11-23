import React, { Component } from 'react';
import DiscordForm from './DiscordForm';
import ResultsSwitch from './Results/ResultSwitch';
import { Link } from 'react-router-dom';
import middleware from '../middleware';
import FormActions from '../actions/FormActions';

export default class ComponentManager extends Component {
    state = {
        editing: true,
    }

    componentDidMount() {
        const { formId } = this.props.match.params;
        middleware.getForm(formId).then(res => {
            FormActions.loadForm(
                res.form.name,
                res.form.order,
                res.form.objects,
            )}).catch(err => {
                window.location.href = `http://localhost:5000/login?id=${formId}&path=edit`; 
            });
    }

    handleEditClick = () => {
        this.setState({editing: true});
    }

    handleResultsClick = () => {
        this.setState({editing: false});
    }

    render() {
        const {formId} = this.props.match.params;
        const path = `/preview/${formId}`;
        const renderedComponent = this.state.editing ? 
            <DiscordForm formId={formId} /> 
            : <ResultsSwitch formId={formId} />;
        return(
            <div className='switching-component'> 
                <div className='top-bar'>
                    <div className='top-bar-content'>
                        <Link className='preview-link' to={path} target='_blank'>Preview</Link>
                        {this.state.editing ? 
                            <button className='results-button' onClick={this.handleResultsClick}>Results</button> :
                            <button className='edit-button' onClick={this.handleEditClick}>Edit</button>}
                    </div>
                </div>      
                {this.state.editing ? 
                <div className='edit-component'>
                    {renderedComponent}
                </div> :
                <div className='result-component'>
                    {renderedComponent}
                </div>}    
            </div>
        );
    }
} 