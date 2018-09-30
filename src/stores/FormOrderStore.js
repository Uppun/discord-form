import {ReduceStore} from 'flux/utils';
import Dispatcher from '../Dispatcher';
import ActionTypes from '../actions/ActionTypes';

class FormOrderStore extends ReduceStore {
    constructor() {
        super(Dispatcher);
    }

    getInitialState() {
        return {
            order: [0],
        }
    }
    reduce(state, action) {
        switch(action.type) {
            default: {
                return state;
            }
        }
    }
}

export default new FormOrderStore();