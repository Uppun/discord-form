import React, { Component } from 'react';
import FormStore from '../../stores/FormStore';
import FormOrderStore from '../../stores/FormOrderStore';
import ResultsStore from '../../stores/ResultsStore';
import {Container} from 'flux/utils';

class FullResults extends Component {
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
        const {results, idToFieldsMap} = this.state;
        return (
            <div className='full-results-page'>
                {results ? results.map((result, index) => {
                    const fields = []; 
                    for (const key in result.submission) {
                        const question = idToFieldsMap.get(key);
                        if (question) {
                            fields.push({answer: result.submission[key], question});
                        }
                    }
                    return (
                        <div key={index} className='result-form'>
                            <div className='result-user'>
                                {result.username}
                            </div>
                            {fields.map((field, index) => {
                                return (
                                    <div key={index} className='result-field'>
                                        <div className='result-question'>
                                            {field.question.question}
                                        </div>
                                        <div className='result-answer'>
                                            {field.answer}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                )}) 
                : <div className='empty-results'>
                    There are no results to display
                </div>}
            </div>
        )
    }
    
}

export default Container.create(FullResults);