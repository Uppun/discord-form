import {ReduceStore} from 'flux/utils';
import Dispatcher from '../Dispatcher';
import ActionTypes from '../actions/ActionTypes';

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
                const aggregate = new Map();

                for (const result of results) {
                    for (const key in result.submission) {
                        if (aggregate.has(key)) {
                            aggregate.set(
                                key, 
                                aggregate.get(key).push(
                                    {
                                        username: result.username, 
                                        response: result.submission[key],
                                    }
                                )
                            );
                        } else {
                            aggregate.set(key, [{
                                username: result.username,
                                response: result.submission[key],
                            }]);
                        }
                    }
                }

                return {
                    results,
                    aggregate,
                }
            }
            default: {
                return state;
            }
        }
    }
}

export default new ResultsStore();