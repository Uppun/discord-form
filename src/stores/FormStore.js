import {ReduceStore} from 'flux/utils';
import Dispatcher from '../Dispatcher';
import ActionTypes from '../actions/ActionTypes';
import {Map} from 'immutable';
import QuestionTypes from '../Assets/QuestionTypes';

function updateElement(array, index, updateFunc) {
    return array.map((item, i) => (i === index ? updateFunc(item) : item))
}

class FormStore extends ReduceStore {
    constructor() {
        super(Dispatcher);
    }

    getInitialState() {
        return null;
    }

    reduce(state, action) {
        switch(action.type) {
            case ActionTypes.UPDATETITLE: {
                const {id, title, description} = action;
                const element = state.idToFieldsMap.get(id.toString());
                const idToFieldsMap = state.idToFieldsMap.set(id.toString(), 
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

            case ActionTypes.UPDATEQUESTION: {
                const {id, question} = action;
                const element = state.idToFieldsMap.get(id.toString());
                const idToFieldsMap = state.idToFieldsMap.set(id.toString(),
                    {
                        ...element,
                        question,
                    });
                return {
                    ...state,
                    idToFieldsMap,
                }
            }

            case ActionTypes.DELETEQUESTION: {
                const {id} = action;
                const idToFieldsMap = state.idToFieldsMap.delete(id.toString());
                return {
                    ...state,
                    idToFieldsMap,
                }
            }

            case ActionTypes.DELETEOPTION: {
                const {id, index} = action;
                const element = state.idToFieldsMap.get(id.toString());
                const idToFieldsMap = state.idToFieldsMap.set(id.toString(),
                    {
                        ...element,
                        options: options.filter((option, i) => {
                            return i !== index;
                        }),
                    });
                return {
                    ...state,
                    idToFieldsMap,
                }
            }

            case ActionTypes.DELETEOTHER: {
                const {id} = action;
                const element = state.idToFieldsMap.get(id.toString()); 
                const idToFieldsMap = state.idToFieldsMap.set(id.toString(),
                    {
                        ...element,
                        otherNotSet: true,
                    });
                return {
                    ...state,
                    idToFieldsMap,
                }
            }

            case ActionTypes.UPDATEOPTION: {
                const {id, index, value} = action;
                const element = state.idToFieldsMap.get(id.toString());
                const idToFieldsMap = state.idToFieldsMap.set(id.toString(),
                    {
                        ...element,
                        options: updateElement(element.options, index, option => [
                            ...option,
                            value,
                        ]),
                    });
                return {
                    ...state,
                    idToFieldsMap,
                }
            }

            case ActionTypes.ADDQUESTION: {
                const {id, format} = action;
                let idToFieldsMap; 
                if (format === QuestionTypes.SHORT || format === QuestionTypes.PARAGRAPH) {
                    idToFieldsMap = state.idToFieldsMap.set(id.toString(),
                        {
                            type: format,
                            question: 'Enter Question',
                            answer: 'Enter Answer'
                        });
                } else if (format === QuestionTypes.MULTIPLE_CHOICE || format === QuestionTypes.CHECKBOX) {
                    idToFieldsMap = state.idToFieldsMap.set(id.toString(),
                        {
                            type: format,
                            question: 'Enter Question',
                            options: ['option 1'],
                            otherNotSet: true,
                        })
                } else {
                    idToFieldsMap = state.idToFieldsMap.set(id.toString(),
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

            case ActionTypes.ADDOTHEROPTION: {
                const {id} = action;
                const element = state.idToFieldsMap.get(id.toString());
                const idToFieldsMap = state.idToFieldsMap.set(id.toString(),
                    {
                        ...element,
                        otherNotSet: false,
                    });

                return {
                    ...state,
                    idToFieldsMap,
                };
            }

            case ActionTypes.ADDOPTION: {
                const {id} = action;
                const element = state.idToFieldsMap.get(id.toString());
                const newElementNumber = element.options.length + 1;
                const idToFieldsMap = state.idToFieldsMap.set(id.toString(),
                    {
                        ...element,
                        options: [...element.options, 'option ' + newElementNumber],
                    });

                return {
                    ...state,
                    idToFieldsMap,
                }
            }

            case ActionTypes.LOADFORM: {
                return {
                    ...state,
                    name: action.name,
                    idToFieldsMap: Map(action.objects),
                }
            }

            default: {
                return state;
            }
        }
    }
}

export default new FormStore();