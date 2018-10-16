import Dispatcher from '../Dispatcher';
import ActionTypes from '../actions/ActionTypes';
import FormStore from './FormStore';
import FormOrderStore from './FormOrderStore';
import middleware from '../middleware';

Dispatcher.register(action => {
    switch(action.type) {
        case ActionTypes.ADDQUESTION: {
            Dispatcher.waitFor([FormStore.getDispatchToken(), FormOrderStore.getDispatchToken()]); 
            middleware.updateForm({
                ...FormOrderStore.getState(),
                name: FormStore.getState().name,
                objects: FormStore.getState().idToFieldsMap,
            }, action.formId);
            break;
        }
        case ActionTypes.DELETEQUESTION: {
            Dispatcher.waitFor([FormStore.getDispatchToken(), FormOrderStore.getDispatchToken()]); 
            middleware.updateForm({
                ...FormOrderStore.getState(),
                name: FormStore.getState().name,
                objects: FormStore.getState().idToFieldsMap,
            }, action.formId);
            break;
        }
        case ActionTypes.ADDOPTION: {
            Dispatcher.waitFor([FormStore.getDispatchToken(), FormOrderStore.getDispatchToken()]);
            middleware.updateForm({
                ...FormOrderStore.getState(),
                name: FormStore.getState().name,
                objects: FormStore.getState().idToFieldsMap,
            }, action.formId);
            break;
        }
        case ActionTypes.DELETEOPTION: {
            Dispatcher.waitFor([FormStore.getDispatchToken(), FormOrderStore.getDispatchToken()]);
            middleware.updateForm({
                ...FormOrderStore.getState(),
                name: FormStore.getState().name,
                objects: FormStore.getState().idToFieldsMap,
            }, action.formId);
            break;
        }
        case ActionTypes.ADDOTHEROPTION: {
            Dispatcher.waitFor([FormStore.getDispatchToken(), FormOrderStore.getDispatchToken()]);
            middleware.updateForm({
                ...FormOrderStore.getState(),
                name: FormStore.getState().name,
                objects: FormStore.getState().idToFieldsMap,
            }, action.formId);
            break;
        }
        case ActionTypes.DELETEOTHER: {
            Dispatcher.waitFor([FormStore.getDispatchToken(), FormOrderStore.getDispatchToken()]);
            middleware.updateForm({
                ...FormOrderStore.getState(),
                name: FormStore.getState().name,
                objects: FormStore.getState().idToFieldsMap,
            }, action.formId);
            break;
        }
        case ActionTypes.UPDATEOPTION: {
            Dispatcher.waitFor([FormStore.getDispatchToken(), FormOrderStore.getDispatchToken()]);
            middleware.updateForm({
                ...FormOrderStore.getState(),
                name: FormStore.getState().name,
                objects: FormStore.getState().idToFieldsMap,
            }, action.formId);
            break;
        }
        case ActionTypes.UPDATEQUESTION: {
            Dispatcher.waitFor([FormStore.getDispatchToken(), FormOrderStore.getDispatchToken()]);
            middleware.updateForm({
                ...FormOrderStore.getState(),
                name: FormStore.getState().name,
                objects: FormStore.getState().idToFieldsMap,
            }, action.formId);
            break;
        }
        case ActionTypes.UPDATETITLE: {
            Dispatcher.waitFor([FormStore.getDispatchToken(), FormOrderStore.getDispatchToken()]);
            middleware.updateForm({
                ...FormOrderStore.getState(),
                name: FormStore.getState().name,
                objects: FormStore.getState().idToFieldsMap,
            }, action.formId);
            break;
        }
        default: {
            break;
        }
    }
});