import React, { Component } from 'react';
import FormStore from '../../stores/FormStore';
import FormOrderStore from '../../stores/FormOrderStore';
import ResultsStore from '../../stores/ResultsStore';
import {Container} from 'flux/utils';
import * as ResultComponents from './ResultObjects';

import './Results.css';

class AggregateResults extends Component {
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
        const {aggregate, order, idToFieldsMap} = this.state;
        console.log(this.state)
        if (!aggregate || aggregate.length === 0) {
            return (
                <div>
                    There are no results to display.
                </div>
            );
        }
        const aggResults = new Map([]);
        for (const id of order) {
            const element = idToFieldsMap.get(id.toString());
            if (element) {
                if (element.type === 'CHECKBOX' || element.type === 'DROPDOWN' || element.type === 'MULTIPLE_CHOICE') {
                    for (const option of element.options) {
                        if (!aggResults.get(id.toString())) {
                            if(Array.isArray(option)) {
                                aggResults.set(id.toString(), new Map([[option[0], 0]]));
                            }
                            aggResults.set(id.toString(), new Map([[option, 0]]));
                        } else {
                            if(Array.isArray(option)) {
                                aggResults.set(id.toString(), aggResults.get(id.toString()).set(option[0], 0));
                            }
                            aggResults.set(id.toString(), aggResults.get(id.toString()).set(option, 0));
                        }
                    }
                }
            }
        }

        for (const [key, value] of aggregate.entries()) {
            const optionsMap = aggResults.get(key);
            if (optionsMap) {
                for (const answer of value) {
                    if (Array.isArray(answer.response)) {
                        for (const option of answer.response) {
                            optionsMap.get(option) ? 
                                optionsMap.set(option, optionsMap.get(option) + 1) :
                                optionsMap.set(option, 1);
                        }
                    } else {
                        optionsMap.get(answer.response) ?
                            optionsMap.set(answer.response, optionsMap.get(answer.response) + 1) :
                            optionsMap.set(answer.response, 1);
                    }
                }
                aggResults.set(key, optionsMap);
            }
        }

        return (
            <div className='aggregate-responses'>
                {order.map(id => {
                    const element = idToFieldsMap.get(id.toString());
                    console.log(element);
                    if (element) {
                        switch(element.type) {
                            case 'CHECKBOX': {
                                return <ResultComponents.CheckBox key={id} options={aggResults.get(id.toString())} question={element.question} />;
                            }
                            case 'DROPDOWN': {
                                return <ResultComponents.DropDown key={id} options={aggResults.get(id.toString())} question={element.question} />;
                            }
                            case 'MULTIPLE_CHOICE': {
                                return <ResultComponents.MultipleChoice key={id} options={aggResults.get(id.toString())} question={element.question} />
                            }
                            case 'PARAGRAPH': {
                                return <ResultComponents.TextResult key={id} responses={aggregate.get(id.toString())} question={element.question} />
                            }
                            case 'SHORT': {
                                return <ResultComponents.TextResult key={id} responses={aggregate.get(id.toString())} question={element.question} />
                            }
                            default: {
                                return null;
                            }
                        }
                    }
                    return null;
                })}
            </div>
        );
    }
}

export default Container.create(AggregateResults);