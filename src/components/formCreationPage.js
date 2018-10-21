import React, { Component } from 'react';
import Middleware from '../middleware';
import { Link } from 'react-router-dom';

export default class FormCreationPage extends Component {
    state = {};

    componentDidMount() {
        Middleware.getForms().then(res => {
            this.setState({res}); 
        }).catch(err => {
            window.location.href = 'http://localhost:5000/login';
        });         
    }

    handleClick = () => {
        const formName = {name: 'test form'}
        Middleware.createForm(formName);
    }

    render() {
        const {res} = this.state;
        return(
            <div className='forms-listing'>
                {res ? res.map((form, index) => {
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
                <button className='form-create' onClick={this.handleClick}>Create Form</button>
            </div>
        )
    }
}