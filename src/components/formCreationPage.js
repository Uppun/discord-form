import React, { Component } from 'react';
import Middleware from '../middleware';
import { NavLink } from 'react-router-dom';

export default class FormCreationPage extends Component {
    state = {
        currentNameValue: '',
    };
    nameBoxRef = React.createRef();

    componentDidMount() {
        Middleware.getForms().then(res => {
            this.setState(res); 
        }).catch(err => {
            console.log(err)
            window.location.href = 'http://localhost:5000/login';
        });         
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const name = this.nameBoxRef.current.value;
        const formName = name ? name : 'Untitled form';
        const date = new Date();
        const creationDate = (date.getMonth() + 1) + '/' + (date.getDate()) + '/' + (date.getFullYear());
        Middleware.createForm(formName, creationDate).then(res => {
            window.location.href = `http://localhost:3000/#/edit/${res}`;
        }).catch(err => {
            console.log(err);
        });
    }

    handleFormNameFocus = (event) => {
        this.nameBoxRef.current.select();
    }

    handleFormNameChange = () => {
        this.setState({currentNameValue: this.nameBoxRef.current.value});
    }
    render() {
        const {formsAndResultsArray, userId, icon, currentNameValue} = this.state;
        return(
            <React.Fragment>
                <FormCreationTopBar id={userId} icon={icon} />
                <div className='content-wrapper'>
                    <form onSubmit={this.handleSubmit}>
                        <div className='header'>Create a form</div>
                        <div className='form-creation'>
                            <div className='form-name-text'>
                                Name: 
                            </div>
                            <div className='name-and-bar'>
                                <input type='text'  ref={this.nameBoxRef} className='name-box' placeholder='Enter form name' onChange={this.handleFormNameChange} value={currentNameValue} onFocus={this.handleFormNameFocus} />
                                <span className='bar' />
                            </div>
                            {currentNameValue ? 
                                <input type='submit' className='form-create' value='Create Form' /> :
                                <input type='button' className='form-create-disabled' value='Create Form' />}
                        </div>
                    </form>
                    <div className='form-page'>
                        <div className='forms-listing'>
                            {formsAndResultsArray ? <div className='header'>Choose a form</div> : null}
                            <div className='form-titles'>
                                <div className='display'>
                                    Name
                                </div>
                                <div className='display'>
                                    Date
                                </div>
                                <div className='display'>
                                    Submissions
                                </div>
                            </div>
                            {formsAndResultsArray ? formsAndResultsArray.map(({form, results}, index) => {
                                const path = `/edit/${form._id}`;
                                return(
                                    <div className='form-preview' key={index}>
                                        <NavLink to={path} role='button' className='form-link'>
                                            <div className='preview name'>
                                                {form.form.name}
                                            </div>
                                            <div className='preview date'>
                                                {form.form.date}
                                            </div>
                                            <div className='preview results'>
                                                {results}
                                            </div>
                                        </NavLink>
                                    </div>
                                )})
                            :
                            null}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

class FormCreationTopBar extends Component {
    render() {
        const {id, icon} = this.props;
        const imgSrc = `https://cdn.discordapp.com/avatars/${id}/${icon}.jpg`;
        return(
            <div className='top-bar'>
                {id&&icon ? 
                    <img className='user-icon' src={imgSrc} alt='icon' /> :
                    null
                }
            </div>
        )
    }
}