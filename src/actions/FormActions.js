import ActionTypes from './ActionTypes';
import Dispatcher from '../Dispatcher';

let idIncrementor = 0;

export default {
    update_title(id, title, description) {
        Dispatcher.dispatch({
            type: ActionTypes.UPDATETITLE,
            title,
            description,
            id,
        });
    },
    addQuestion(format) {
        idIncrementor++;
        Dispatcher.dispatch({
            type: ActionTypes.ADDQUESTION,
            format,
            id: idIncrementor,
        });
    },
    updateQuestion(id, question) {
        Dispatcher.dispatch({
            type: ActionTypes.UPDATEQUESTION,
            question,
            id,
        });
    },
    addOther(id) {
        Dispatcher.dispatch({
            type: ActionTypes.ADDOTHEROPTION,
            id,
        });
    },
    addOption(id) {
        Dispatcher.dispatch({
            type: ActionTypes.ADDOPTION,
            id,
        });
    },
    updateOption(id, index, value) {
        Dispatcher.dispatch({
            type: ActionTypes.UPDATEOPTION,
            id,
            index,
            value,
        });
    },
}