import React, { Component } from 'react';
import FullResults from './FullResults';
import AggregateResults from './Aggregate';
import FormActions from '../../actions/FormActions';
import Middleware from '../../middleware';
import './Results.css';


export default class ResultsManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            full: true,
        };
    }


    handleFullClick = () => {
        this.setState({full: true});
    }

    handleAggregateClick = () => {
        this.setState({full: false});
    }

    componentDidMount() {
        const {formId} = this.props;
        Middleware.getResults(formId).then(result => {
            FormActions.setResults(result);
        }).catch(error => {
            window.location = `/api/login?id=${formId}&path=edit`; 
        });
    }

    render() {
        const {formId} = this.props;
        const {full} = this.state;
        const renderedComponent = full ? 
            <FullResults formId={formId} /> 
            : <AggregateResults formId={formId} />;
        return(
            <div className='switching-component'>
                {full ? 
                    <button className='aggregate-button' onClick={this.handleAggregateClick}>Aggregate</button> :
                    <button className='full-button' onClick={this.handleFullClick}>Full</button>  
                } 
                {renderedComponent}
            </div>
        );
    }
}