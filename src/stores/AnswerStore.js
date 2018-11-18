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
                const required = [];

                for (const [id, object] of Object.entries(objects)) {
                    if (object.type !== 'TITLE') {
                        Answers.push([id, '']);
                        if (object.required) {
                            required.push(id);
                        }
                    }
                }
                const AnswersMap = Map(Answers);
                let canSubmit = true;

                for (const id of required) {
                    if (!AnswersMap.get(id)) {
                        canSubmit = false;
                    }
                }

                return {
                    canSubmit,
                    required,
                    AnswersMap,
                }
            }

            case ActionTypes.UPDATEANSWER: {
                const AnswersMap = state.AnswersMap.set(action.id.toString(), action.answer);
                const {required} = state;
                let canSubmit = true;

                for (const id of required) {
                    if (AnswersMap.get(id) === '' || AnswersMap.get(id) === []) {
                        canSubmit = false;
                    }
                }

                return {
                    ...state, 
                    canSubmit,
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