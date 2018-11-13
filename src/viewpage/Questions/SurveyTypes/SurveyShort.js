import React, { Component } from 'react';
import '../../../Assets/Forms.css';
import {Container} from 'flux/utils';
import AnswerStore from '../../../stores/AnswerStore';
import FormActions from '../../../actions/FormActions';

class ShortAnswer extends Component {
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
            <input type='text' className='survey-short-answer-entry' name={this.props.id} value={value} onChange={this.handleChange} />
        )
    }
}

export default Container.create(ShortAnswer);