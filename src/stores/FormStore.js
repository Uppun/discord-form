import {ReduceStore} from 'flux/utils';
import Dispatcher from '../Dispatcher';
import ActionTypes from '../actions/ActionTypes';
import {Map} from 'immutable';

class FormStore extends ReduceStore {
    constructor() {
        super(Dispatcher);
    }

    getInitialState() {
        const initialIdToFieldsMap = Map();
        const idToFieldsMap = initialIdToFieldsMap.set(0, {
            type: 'title',
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

            case ActionTypes.ADD_OTHER_OPTION: {
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

            case ActionTypes.ADD_OPTION: {
                const {id} = action;
                const element = state.idToFieldsMap.get(id);
                const idToFieldsMap = state.idToFieldsMap.set(id,
                    {
                        ...element,
                        options: [...element.options, ('option ' + element.options.length + 2)],
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