import {ReduceStore} from 'flux/utils';
import Dispatcher from '../Dispatcher';
import ActionTypes from '../actions/ActionTypes';
import {Map} from 'immutable';

class AnswerStore extends ReduceStore {
    constructor() {
        super(Dispatcher);
    }

    getInitialState() {
        return null;
    }   

    reduce(state, action) {
        switch(action.type) {
            case ActionTypes.LOADFORM: {
                const Answers = [];
                const {objects} = action; 

                for (const [id, object] of Object.entries(objects)) {
                    if (object.type !== 'TITLE') {
                        Answers.push([id, ''])
                    }
                }
                const AnswersMap = Map(Answers);

                return {
                    AnswersMap,
                }
            }

            case ActionTypes.UPDATEANSWER: {
                const AnswersMap = state.AnswersMap.set(action.id.toString(), action.answer);
                return {
                    AnswersMap,
                }
            }

            default: {
                return state;
            }
        }
    }
}

export default new AnswerStore();