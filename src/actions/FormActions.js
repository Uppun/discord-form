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
}