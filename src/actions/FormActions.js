import ActionTypes from './ActionTypes';
import Dispatcher from '../Dispatcher';

let idIncrementor = 0;

export default {
    update_title(id, title, description) {
        Dispatcher.dispatch({
            type: ActionTypes.UPDATE_TITLE,
            title,
            description,
            id,
        });
    },
    addQuestion(format) {
        idIncrementor++;
        Dispatcher.dispatch({
            type: ActionTypes.addQuestion,
            format,
            id: idIncrementor,
        });
    },
    updateQuestion(id, question) {
        Dispatcher.dispatch({
            type: ActionTypes.updateQuestion,
            question,
            id,
        });
    },
    addOther(id) {
        Dispatcher.dispatch({
            type: ActionTypes.addOther_OPTION,
            id,
        });
    },
    addOption(id) {
        Dispatcher.dispatch({
            type: ActionTypes.addOption,
            id,
        });
    },
    updateOption(id, index, value) {
        Dispatcher.dispatch({
            type: ActionTypes.updateOption,
            id,
            index,
            value,
        });
    },
}