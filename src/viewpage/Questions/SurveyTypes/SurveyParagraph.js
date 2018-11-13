import React, { Component } from 'react';
import '../../../Assets/Forms.css';
import {Container} from 'flux/utils';
import AnswerStore from '../../../stores/AnswerStore';
import FormActions from '../../../actions/FormActions';

class Paragraph extends Component {
    static getStores() {
        return [AnswerStore];
    }
    
    static calculateState(prevState) {
        return {
            ...AnswerStore.getState(),
        };
    }

    handleChange = (event) => {
        FormActions.updateAnswer(this.props.id, event.target.value);
    }

    render() {
        const {AnswersMap} = this.state;
        const {id} = this.props;
        const value = AnswersMap.get(id.toString());
        return(
            <textarea className='survey-paragraph-entry' rows='10' cols='50' name={this.props.id} value={value} onChange={this.handleChange} />
        )
    }
}

export default Container.create(Paragraph);