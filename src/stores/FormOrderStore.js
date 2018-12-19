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
                const order = [...state.order, action.id];
                return {
                    order,
                };
            }
            case ActionTypes.ADDTITLE: {
                const order = [...state.order, action.id];
                return {
                    order,
                };
            }
            case ActionTypes.DELETEQUESTION: {
                const order = [];
                for (let id of state.order) {
                    if (parseInt(id, 10) !== action.id) {
                        order.push(parseInt(id, 10));
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