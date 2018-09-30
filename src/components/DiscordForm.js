import React, { Component } from 'react';
import FormStore from '../stores/FormStore';
import FormOrderStore from '../stores/FormOrderStore';
import {Container} from 'flux/utils';
import TitleObject from './Title';

class DiscordForm extends Component {
    static getStores() {
        return [FormStore, FormOrderStore];
    }
    
    static calculateState(prevState) {
        const formOrder = FormOrderStore.getState();
        const formFields = FormStore.getState();

        return {
            order: formOrder.order,
            idToFieldsMap: formFields.idToFieldsMap
        };
    }

    render() {
        const {order, idToFieldsMap} = this.state;

        return(
            order.map((id) => {
                const element = idToFieldsMap.get(id);
                if (element.type === 'title') {
                    return <TitleObject key={id} id={id} title={element.title} description={element.description} />
                }
            })
        )
    }
}

export default Container.create(DiscordForm);