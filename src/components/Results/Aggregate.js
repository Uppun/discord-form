import React, { Component } from 'react';
import FormStore from '../../stores/FormStore';
import FormOrderStore from '../../stores/FormOrderStore';
import ResultsStore from '../../stores/ResultsStore';
import Middleware from '../../middleware';
import FormActions from '../../actions/FormActions';
import {Container} from 'flux/utils';
import * as ResultComponents from './ResultObjects';

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

    componentDidMount() {
        const {formId} = this.props.formId;
        Middleware.getResults(formId).then(result => {
            FormActions.setResults(result);
        }).catch(error => {
            FormActions.setResults(null);
        });
    }

    render() {
        const {aggregate, order, idToFieldsMap} = this.state;
        const aggResults = new Map();
        for (const id of order) {
            const element = idToFieldsMap.get(id);
            if (element) {
                if (element.type === 'CHECKBOX' || element.type === 'DROPDOWN' || element.type === 'MULTIPLE_CHOICE') {
                    for (const option of element.options) {
                        aggResults.set(id, new Map(option, 0));
                    }
                }
            }
        }

        for (const [key, value] of aggregate.entries()) {
            const optionsMap = aggResults.get(key);
            if (optionsMap) {
                for (const answer of value) {
                    optionsMap.set(answer.response, optionsMap.get(answer) + 1);
                }
                aggResults.set(key, optionsMap);
            }
        }

        return (
            <div className='aggregate-responses'>
                {order.map(id => {
                    const element = idToFieldsMap.get(id);
                    if (element) {
                        switch(element.type) {
                            case 'CHECKBOX': {
                                return <ResultComponents.CheckBox options={aggResults.get(id)} />;
                            }
                            case 'DROPDOWN': {
                                return <ResultComponents.DropDown options={aggResults.get(id)} />;
                            }
                            case 'MULTIPLE_CHOICE': {
                                return <ResultComponents.MultipleChoice options={aggResults.get(id)} />
                            }
                            case 'PARAGRAPH': {
                                return <ResultComponents.TextResult responses={aggregate.get(id)} />
                            }
                            case 'SHORT': {
                                return <ResultComponents.TextResult responses={aggregate.get(id)} />
                            }
                            default: {
                                return null;
                            }
                        }
                    }
                })}
            </div>
        );
    }
}

export default Container.create(AggregateResults);