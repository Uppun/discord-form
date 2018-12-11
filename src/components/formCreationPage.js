import React, { Component } from 'react';
import Middleware from '../middleware';
import { NavLink } from 'react-router-dom';

export default class FormCreationPage extends Component {
    state = {};
    nameBoxRef = React.createRef();

    componentDidMount() {
        Middleware.getForms().then(res => {
            this.setState(res); 
        }).catch(err => {
            window.location.href = 'http://localhost:5000/login';
        });         
    }

    handleSumbit = (event) => {
        event.preventDefault();
        const name = this.nameBoxRef.current.value;
        const formName = name ? {name} : {name: 'Untitled form'};
        Middleware.createForm(formName).then(res => {
            window.location.href = `http://localhost:3000/#/edit/${res}`;
        }).catch(err => {
            console.log(err);
        });
    }


    render() {
        const {formsArray, userId, icon} = this.state;
        return(
            <React.Fragment>
                <FormCreationTopBar id={userId} icon={icon} />
                <div className='content-wrapper'>
                    <form onSubmit={this.handleSubmit}>
                        <div className='header'>Create a form</div>
                        <input type='text' className='name-box' ref={this.nameBoxRef} placeholder='Enter form name' />
                        <button type='submit' className='form-create'>Create Form</button>
                    </form>
                    <div className='form-page'>
                        <div className='forms-listing'>
                            {formsArray ? formsArray.map((form, index) => {
                                const path = `/edit/${form._id}`;
                                return(
                                    <div className='form-preview' key={index}>
                                        <NavLink to={path} role='button' className='form-link'>
                                            {form.form.name}
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