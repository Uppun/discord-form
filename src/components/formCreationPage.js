import React, { Component } from 'react';
import FormActions from '../actions/FormActions';
import Middleware from '../middleware';

export default class FormCreationPage extends Component {
    state = {};

    componentDidMount() {
        Middleware.getForms().then(res => this.setState({res})); 
    }

    handleClick = () => {
        Middleware.createForm('test form');
    }

    render() {
        const {res} = this.state;
        return(
            <div className='forms-listing'>
                {res ? res.map((form, index) => {
                    return(
                        <div className='form-preview'>
                            {form._id}
                        </div>
                    )})
                :
                null}
                <button className='form-create' onClick={this.handleClick}>Create Form</button>
            </div>
        )
    }
}