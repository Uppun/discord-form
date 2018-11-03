import {ReduceStore} from 'flux/utils';
import Dispatcher from '../Dispatcher';
import ActionTypes from '../actions/ActionTypes';
import {Map} from 'immutable';
import QuestionTypes from '../Assets/QuestionTypes';

class ResultsStore extends ReduceStore {
    constructor() {
        super(Dispatcher);
    }

    getInitialState() {
        return null;
    }

    reduce(state, action) {
        switch(action.type) {
            case ActionTypes.SETRESULTS: {
                const {results} = action;
                return {
                    results,
                }
            }
            default: {
                return state;
            }
        }
    }
}

export default new ResultsStore();