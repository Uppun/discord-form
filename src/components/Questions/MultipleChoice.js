import React, { Component } from 'react';
import FormActions from '../../actions/FormActions';
import '../../Assets/Forms.css';

export default class MultipleChoice extends Component {
    handleOtherFocus = () => {
        const {id, formId} = this.props;
        FormActions.addOther(id, formId);
    }

    handleAnotherFocus = () => {
        const {id, formId} = this.props;
        FormActions.addOption(id, formId);
    }

    handleOptionChange = (index, value) => {
        const {id, formId} = this.props;
        
        FormActions.updateOption(id, index, value, formId);
    }

    handleRequireChange = () => {
        const {id, formId} = this.props;
        FormActions.setRequired(id, formId);
    }

    handleOtherRemoveClick = () => {
        const {id, formId} = this.props;
        FormActions.deleteOther(id, formId);
    }

    render() {
        const {options, otherNotSet, id, required} = this.props;
        let canRemove = false;
        if (options) {
            let optionsLength = options.length;
            if (!otherNotSet) {
                optionsLength++;
            }
            canRemove = optionsLength > 1 ? true : false;
        }
        return(
            <div className='options'>
                {options.map((option, index) => {
                    return(
                        <MultipleChoiceOption key={index} index={index} option={option} id={id} onChange={this.handleOptionChange} canRemove={canRemove}/>
                    )})}
                {otherNotSet ? 
                    <div className='more-options'>
                        <input type='text' className='another-box' ref={this.nameBoxRef} placeholder='Add option' onFocus={this.handleAnotherFocus} />
                        or
                        <input type='text' className='other-box' ref={this.nameBoxRef} placeholder='Add other' onFocus={this.handleOtherFocus} />
                    </div>
                    :
                    <React.Fragment>
                        <div className='option'>
                            <input type='radio' className='checkbox-choice-option' disabled />
                            <input type='text' className='other-text' defaultValue='Other' readOnly />
                            {canRemove ? <span className="remove-option" onClick={this.handleOtherRemoveClick}>&times;</span> : null}
                        </div>
                        <div className='more-options'>
                            <input type='text' className='another-box' ref={this.nameBoxRef} placeholder='Add option' onFocus={this.handleAnotherFocus} />
                        </div>
                    </React.Fragment>
                    }
                    <label className='required-check'>
                        <input type='checkbox' className='required-button' checked={required} onChange={this.handleRequireChange} /> Required
                    </label>
            </div>
        )
    }
}

class MultipleChoiceOption extends Component {
    optionRef = React.createRef();

    handleChange = (event) => {
        const {index, onChange} = this.props;
        const {value} = event.target;

        onChange(index, value);
    }

    handleRemoveClick = () => {
        const {id, index, formId} = this.props;

        FormActions.deleteOption(id, index, formId);
    }

    componentDidMount() {
        this.optionRef.focus();
    }

    handleFocus = () => {
        this.optionRef.select();
    }

    render() {
        const {option, canRemove} = this.props;
        return (
            <div className='option'>
                <input type='radio' className='multi-choice-option' disabled />
                <div>
                    <input type='text' ref={element => this.optionRef = element} className='option-text' value={option} onChange={this.handleChange} onFocus={this.handleFocus} />
                    <span className='bar' />
                </div>
                {canRemove ? <span className="remove-option" onClick={this.handleRemoveClick}>&times;</span> : null}
            </div>
        )
    }
}