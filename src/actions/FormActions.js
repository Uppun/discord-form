import ActionTypes from './ActionTypes';
import Dispatcher from '../Dispatcher';

let idIncrementor = 0;

export default {
    updateTitle(id, title, description, formId) {
        Dispatcher.dispatch({
            type: ActionTypes.UPDATETITLE,
            title,
            description,
            id,
            formId,
        });
    },
    addQuestion(format, formId) {
        idIncrementor++;
        Dispatcher.dispatch({
            type: ActionTypes.ADDQUESTION,
            format,
            id: idIncrementor,
            formId,
        });
    },
    deleteQuestion(id, formId) {
        Dispatcher.dispatch({
            type: ActionTypes.DELETEQUESTION,
            id,
            formId,
        });
    },
    updateQuestion(id, question, formId) {
        Dispatcher.dispatch({
            type: ActionTypes.UPDATEQUESTION,
            question,
            id,
            formId,
        });
    },
    addOther(id, formId) {
        Dispatcher.dispatch({
            type: ActionTypes.ADDOTHEROPTION,
            id,
            formId,
        });
    },
    deleteOther(id, formId) {
        Dispatcher.dispatch({
            type: ActionTypes.DELETEOTHER,
            id,
            formId,
        });
    },
    addOption(id, formId) {
        Dispatcher.dispatch({
            type: ActionTypes.ADDOPTION,
            id,
            formId,
        });
    },
    deleteOption(id, index, formId) {
        Dispatcher.dispatch({
            type: ActionTypes.DELETEOPTION,
            id,
            index,
            formId,
        });
    },
    updateOption(id, index, value, formId) {
        Dispatcher.dispatch({
            type: ActionTypes.UPDATEOPTION,
            id,
            index,
            value,
            formId,
        });
    },
    loadForm(name, date, order, objects) {
        for (const id of order) {
            if (id > idIncrementor) {
                idIncrementor = id;
            }
        }

        Dispatcher.dispatch({
            type: ActionTypes.LOADFORM,
            order,
            objects,
            name,
            date,
        });
    },
    setResults(results) {
        Dispatcher.dispatch({
            type: ActionTypes.SETRESULTS,
            results,
        });
    },
    updateAnswer(id, answer) {
        Dispatcher.dispatch({
            type: ActionTypes.UPDATEANSWER,
            id, 
            answer,
        });
    },
    setRequired(id, formId) {
        Dispatcher.dispatch({
            type: ActionTypes.SETREQUIRED,
            id,
            formId,
        });
    },
    addTitle(formId) {
        idIncrementor++;
        Dispatcher.dispatch({
            type: ActionTypes.ADDTITLE,
            id: idIncrementor,
            formId,
        });
    },
}