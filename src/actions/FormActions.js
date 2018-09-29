import ActionTypes from './ActionTypes';
import Dispatcher from '../Dispatcher';

export default {
    update_title(index, title, description) {
        Dispatcher.dispatch({
            type: ActionTypes.UPDATE_TITLE,
            title,
            description,
            index,
        });
    },
    add_question(format) {
        Dispatcher.dispatch({
            type: ActionTypes.ADD_QUESTION,
            format,
        });
    },
    update_question(index, question) {
        Dispatcher.dispatch({
            type: ActionTypes.UPDATE_QUESTION,
            question,
            index,
        });
    },
    add_other(index) {
        Dispatcher.dispatch({
            type: ActionTypes.ADD_OTHER_OPTION,
            index,
        });
    },
    add_option(index) {
        Dispatcher.dispatch({
            type: ActionTypes.ADD_OPTION,
            index,
        });
    },
}