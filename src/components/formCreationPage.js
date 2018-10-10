import React, { Component } from 'react';
import FormActions from '../actions/FormActions';
import Middleware from '../middleware';

export default class FormCreationPage extends Component {
    state = {};

    componentDidMount() {
        Middleware.getForms();    
    }
    render() {
        return()
    }
}