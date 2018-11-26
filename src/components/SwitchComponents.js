import React, { Component } from 'react';
import DiscordForm from './DiscordForm';
import ResultsSwitch from './Results/ResultSwitch';
import { Link } from 'react-router-dom';
import middleware from '../middleware';
import FormActions from '../actions/FormActions';
import '../Assets/Forms.css';

export default class ComponentManager extends Component {
    state = {
        editing: true,
    }

    componentDidMount() {
        const { formId } = this.props.match.params;
        middleware.getForm(formId).then(res => {
            this.setState({...this.state, icon: res.userIcon, id: res.userId});
            FormActions.loadForm(
                res.doc.form.name,
                res.doc.form.order,
                res.doc.form.objects,
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
        const {id, icon} = this.state;
        const path = `/preview/${formId}`;
        const renderedComponent = this.state.editing ? 
            <DiscordForm formId={formId} /> 
            : <ResultsSwitch formId={formId} />;
        const imgSrc = `https://cdn.discordapp.com/avatars/${id}/${icon}.jpg`;
        return(
            <div className='switching-component'> 
                <div className='top-bar'>
                    <div className='top-bar-content'>
                        <img className='user-icon' src={imgSrc} Alt='icon' />
                        <Link className='preview-link' to={path} target='_blank'>Preview</Link>
                        {this.state.editing ? 
                            <button className='results-button' onClick={this.handleResultsClick}>Results</button> :
                            <button className='edit-button' onClick={this.handleEditClick}>Edit</button>
                        }
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