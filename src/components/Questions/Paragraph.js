import React, { Component } from 'react';
import '../../Assets/Forms.css';
import FormActions from '../../actions/FormActions';

export default class Paragraph extends Component {
    handleRequireChange = () => {
        const {id, formId} = this.props;
        FormActions.setRequired(id, formId);
    }

    render() {
        const {required} = this.props;
        return(
            <div className='paragraph-question'>
                <textarea className='paragraph-entry' rows='10' cols='50' disabled />
                <label className='required-check'>
                        <input type='checkbox' className='required-button' checked={required} onChange={this.handleRequireChange} /> Required
                </label>
            </div>
        )
    }
}