import React, { Component } from 'react';
import FormStore from '../../stores/FormStore';
import FormOrderStore from '../../stores/FormOrderStore';
import ResultsStore from '../../stores/ResultsStore';

export default class FullResults extends Component {
    static getStores() {
        return [FormStore, FormOrderStore, ResultsStore];
    }
    
    static calculateState(prevState) {
        return {
            ...FormOrderStore.getState(),
            ...FormStore.getState(),
            ...ResultsStore.getState(),
        };
    }

    render() {
        const {results, order, idToFieldsMap} = this.state;
        return (
            <div className='full-results-page'>
                {results.map((result, index) => {
                    const fields = []; 
                    for (const key in result.submission) {
                        const question = idToFieldsMap.get(key);
                        if (question) {
                            fields.push({answer: result.submission.key, question});
                        }
                    }
                    return (
                        <div className='result-form'>
                            <div className='result-user'>
                                {result.username}
                            </dv>
                            {fields.map((field, index) => {
                                return (
                                    <div className='result-field'>
                                        {field.question}
                                        {field.answer}
                                    </div>
                                )
                            })}
                        </div>
                )})}
            </div>
        )
    }
    
}