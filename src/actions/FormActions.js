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
    add_question(format) {
        idIncrementor++;
        Dispatcher.dispatch({
            type: ActionTypes.ADD_QUESTION,
            format,
            id: idIncrementor,
        });
    },
    update_question(id, question) {
        Dispatcher.dispatch({
            type: ActionTypes.UPDATE_QUESTION,
            question,
            id,
        });
    },
    add_other(id) {
        Dispatcher.dispatch({
            type: ActionTypes.ADD_OTHER_OPTION,
            id,
        });
    },
    add_option(id) {
        Dispatcher.dispatch({
            type: ActionTypes.ADD_OPTION,
            id,
        });
    },
    update_option(id, index, value) {
        Dispatcher.dispatch({
            type: ActionTypes.UPDATE_OPTION,
            id,
            index,
            value,
        });
    },
}