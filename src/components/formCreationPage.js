import React, { Component } from 'react';
import Middleware from '../middleware';
import { Link } from 'react-router-dom';

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

    handleClick = () => {
        const name = this.nameBoxRef.current.value;
        const formName = name ? {name} : {name: 'Untitled form'};
        Middleware.createForm(formName).then(res => {
            window.location.href = `http://localhost:3000/#/edit/${res}`;
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        const {formsArray} = this.state;
        return(
            <div className='forms-listing'>
                {formsArray ? formsArray.map((form, index) => {
                    const path = `/edit/${form._id}`;
                    return(
                        <div className='form-preview' key={index}>
                            <Link to={path}>
                                {form.form.name}
                            </Link>
                        </div>
                    )})
                :
                null}
                <input type='text' className='name-box' ref={this.nameBoxRef} placeholder='Enter form name' />
                <button className='form-create' onClick={this.handleClick}>Create Form</button>
            </div>
        )
    }
}

class FormCreationTopBar extends Component {
    render() {
        const {id, icon} = this.props;
        const imgSrc = `https://cdn.discordapp.com/avatars/${id}/${icon}.jpg`;
        return(
            <div className='form-creation-top-bar'>
                {id&&icon ? 
                    <img className='user-icon' src={imgSrc} Alt='icon' /> :
                    null
                }
            </div>
        )
    }
}