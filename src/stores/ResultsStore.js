import {ReduceStore} from 'flux/utils';
import Dispatcher from '../Dispatcher';
import ActionTypes from '../actions/ActionTypes';
import {Map} from 'immutable';
import QuestionTypes from '../Assets/QuestionTypes';

class ResultsStore extends ReduceStore {
    constructor() {
        super(Dispatcher);
    }

    reduce(state, action) {
        
    }
}

export default new ResultsStore();