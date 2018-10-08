import {ReduceStore} from 'flux/utils';
import Dispatcher from '../Dispatcher';
import ActionTypes from '../actions/ActionTypes';
import {Map} from 'immutable';
import QuestionTypes from '../Assets/QuestionTypes';

class FormStore extends ReduceStore {
    constructor() {
        super(Dispatcher);
    }

    getInitialState() {
        const initialIdToFieldsMap = Map();
        const idToFieldsMap = initialIdToFieldsMap.set(0, {
            type: QuestionTypes.TITLE,
            title: 'Enter title',
            description: 'Enter description',
        });
        return {
            idToFieldsMap,
        }
    }

    reduce(state, action) {
        switch(action.type) {
            case ActionTypes.UPDATE_TITLE: {
                const {id, title, description} = action;
                const element = state.idToFieldsMap.get(id);
                const idToFieldsMap = state.idToFieldsMap.set(id, 
                    {
                        ...element,
                        title,
                        description,
                    });

                return {
                    ...state,
                    idToFieldsMap,
                }
            }

            case ActionTypes.addQuestion: {
                const {id, format} = action;
                let idToFieldsMap; 
                if (format === QuestionTypes.SHORT || format === QuestionTypes.PARAGRAPH) {
                    idToFieldsMap = state.idToFieldsMap.set(id,
                        {
                            type: format,
                            question: 'Enter Question',
                            answer: 'Enter Answer'
                        });
                } else if (format === QuestionTypes.MULTIPLE_CHOICE || format === QuestionTypes.CHECKBOX) {
                    idToFieldsMap = state.idToFieldsMap.set(id,
                        {
                            type: format,
                            question: 'Enter Question',
                            options: ['option 1'],
                            otherNotSet: true,
                        })
                } else {
                    idToFieldsMap = state.idToFieldsMap.set(id,
                        {
                            type: format,
                            question: 'Enter Question',
                            options: ['option 1'],
                        })
                }
                
                return {
                    ...state,
                    idToFieldsMap,
                }
            }

            case ActionTypes.addOther_OPTION: {
                const {id} = action;
                const element = state.idToFieldsMap.get(id);
                const idToFieldsMap = state.idToFieldsMap.set(id,
                    {
                        ...element,
                        otherNotSet: false,
                    });

                return {
                    ...state,
                    idToFieldsMap,
                };
            }

            case ActionTypes.addOption: {
                const {id} = action;
                const element = state.idToFieldsMap.get(id);
                const newElementNumber = element.options.length + 1;
                const idToFieldsMap = state.idToFieldsMap.set(id,
                    {
                        ...element,
                        options: [...element.options, 'option ' + newElementNumber],
                    });

                return {
                    ...state,
                    idToFieldsMap,
                }
            }

            default: {
                return state;
            }
        }
    }
}

export default new FormStore();