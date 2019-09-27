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
                if (results) {
                    const aggregate = new Map();
                    for (const result of results) {
                        for (const key in result.submission) {
                            if (aggregate.has(key)) {
                                const currentAggregate = aggregate.get(key);
                                currentAggregate.push(
                                        {
                                            username: result.username,
                                            userId: result.userId,
                                            icon: result.icon, 
                                            response: result.submission[key],
                                        }
                                    )
                                aggregate.set(
                                    key, 
                                    currentAggregate,
                                );
                            } else {
                                aggregate.set(key, [{
                                    username: result.username,
                                    userId: result.userId,
                                    icon: result.icon,
                                    response: result.submission[key],
                                }]);
                            }
                        }
                    }
                    return {
                        results,
                        aggregate,
                    }
                } else {
                    return {
                        results,
                    }
                }
            }
            default: {
                return state;
            }
        }
    }
}

export default new ResultsStore();