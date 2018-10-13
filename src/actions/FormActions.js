import ActionTypes from './ActionTypes';
import Dispatcher from '../Dispatcher';

let idIncrementor = 0;

export default {
    update_title(id, title, description, formId) {
        Dispatcher.dispatch({
            type: ActionTypes.UPDATETITLE,
            title,
            description,
            id,
        });
    },
    addQuestion(format, formId) {
        idIncrementor++;
        Dispatcher.dispatch({
            type: ActionTypes.ADDQUESTION,
            format,
            id: idIncrementor,
        });
    },
    updateQuestion(id, question, formId) {
        Dispatcher.dispatch({
            type: ActionTypes.UPDATEQUESTION,
            question,
            id,
        });
    },
    addOther(id, formId) {
        Dispatcher.dispatch({
            type: ActionTypes.ADDOTHEROPTION,
            id,
        });
    },
    addOption(id, formId) {
        Dispatcher.dispatch({
            type: ActionTypes.ADDOPTION,
            id,
        });
    },
    updateOption(id, index, value, formId) {
        Dispatcher.dispatch({
            type: ActionTypes.UPDATEOPTION,
            id,
            index,
            value,
        });
    },
    loadForm(name, order, objects) {
        Dispatcher.dispatch({
            type: ActionTypes.LOADFORM,
            order,
            objects,
        })
    },
}