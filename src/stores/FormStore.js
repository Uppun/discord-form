import {ReduceStore} from 'flux/utils';
import Dispatcher from '../Dispatcher';
import ActionTypes from '../actions/ActionTypes';

function updateElement(array, index, updateFunc) {
    return array.map((item, i) => i === index ? updateFunc(item) : item);
}

class FormStore extends ReduceStore {
    constructor() {
        super(Dispatcher);
    }

    getInitialState() {
        return {
            elements: [
                {
                    type: 'title',
                    title: 'Enter title',
                    description: 'Enter description',
                },
            ]
        }
    }

    reduce(state, action) {
        switch(action.type) {
            case ActionTypes.UPDATE_TITLE: {
                const {index, title, description} = action;
                return {
                    ...state,
                    elements: updateElement(state.elements, index, element => ({
                        ...element, 
                        title,
                        description,
                    }))
                };
            }

            case ActionTypes.ADD_OTHER_OPTION: {
                const {index} = action;

                return {
                    ...state,
                    elements: updateElement(state.elements, index, element => ({
                        ...element,
                        other = false,
                    }))
                };
            }

            case ActionTypes.ADD_OPTION: {
                const {index} = action;
                //MAKE A DEEP CLONE OF THE ELEMENTS ARRAY HERE
                return {
                    ...state,
                    elements: updateElement(state.elements, index, element => ({
                        ...element,
                    }))
                }
            }

            default: {
                return state;
            }
        }
    }
}

export default new FormStore();