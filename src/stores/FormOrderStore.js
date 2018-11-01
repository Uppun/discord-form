import {ReduceStore} from 'flux/utils';
import Dispatcher from '../Dispatcher';
import ActionTypes from '../actions/ActionTypes';

class FormOrderStore extends ReduceStore {
    constructor() {
        super(Dispatcher);
    }

    getInitialState() {
        return null;
    }
    reduce(state, action) {
        switch(action.type) {
            case ActionTypes.ADDQUESTION: {
                return {
                    order: [...state.order, action.id]
                };
            }
            case ActionTypes.DELETEQUESTION: {
                const order = [];
                for (let id in state.order) {
                    if (parseInt(id) !== action.id) {
                        order.push(id);
                    }
                }
                return {
                    order,
                };
            }
            case ActionTypes.LOADFORM: {
                return {
                    order: action.order,
                }
            }

            default: {
                return state;
            }
        }
    }
}

export default new FormOrderStore();