import React, { Component } from 'react';
import FormStore from '../stores/FormStore';
import {Container} from 'flux/utils';
import TitleObject from './Title';

class DiscordForm extends Component {
    static getStores() {
        return [FormStore];
    }
    
    static calculateState(prevState) {
        return FormStore.getState();
    }

    render() {
        const {elements} = this.state;

        return(
            elements.map((element, index) => {
                if (element.type === 'title') {
                    return <TitleObject key={index} index={index} title={element.title} description={element.description} />
                }
            })
        )
    }
}

export default Container.create(DiscordForm);