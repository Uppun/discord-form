import Dispatcher from '../Dispatcher';
import ActionTypes from '../actions/ActionTypes';
import FormStore from './FormStore';
import FormOrderStore from './FormOrderStore';
import middleware from '../middleware';

Dispatcher.register(action => {
    switch(action.type) {
        case ActionTypes.ADDQUESTION: {
            Dispatcher.waitFor([FormStore.dispatchToken, FormOrderStore.dispatchToken]);
            middleware.updateForm({
                ...FormOrderStore.getState(),
                ...FormStore.getState(),
            }, action.formId);
            break;
        }
        case ActionTypes.ADDOPTION: {
            Dispatcher.waitFor([FormStore.dispatchToken, FormOrderStore.dispatchToken]);
            middleware.updateForm({
                ...FormOrderStore.getState(),
                ...FormStore.getState(),
            }, action.formId);
            break;
        }
        case ActionTypes.ADDOTHEROPTION: {
            Dispatcher.waitFor([FormStore.dispatchToken, FormOrderStore.dispatchToken]);
            middleware.updateForm({
                ...FormOrderStore.getState(),
                ...FormStore.getState(),
            }, action.formId);
            break;
        }
        case ActionTypes.UPDATEOPTION: {
            Dispatcher.waitFor([FormStore.dispatchToken, FormOrderStore.dispatchToken]);
            middleware.updateForm({
                ...FormOrderStore.getState(),
                ...FormStore.getState(),
            }, action.formId);
            break;
        }
        case ActionTypes.UPDATEQUESTION: {
            Dispatcher.waitFor([FormStore.dispatchToken, FormOrderStore.dispatchToken]);
            middleware.updateForm({
                ...FormOrderStore.getState(),
                ...FormStore.getState(),
            }, action.formId);
            break;
        }
        case ActionTypes.UPDATETITLE: {
            Dispatcher.waitFor([FormStore.dispatchToken, FormOrderStore.dispatchToken]);
            middleware.updateForm({
                ...FormOrderStore.getState(),
                ...FormStore.getState(),
            }, action.formId);
            break;
        }
        default: {
            break;
        }
    }
});