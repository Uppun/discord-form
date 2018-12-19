import React, { Component } from 'react';
import FormActions from '../../actions/FormActions';
import '../../Assets/Forms.css';

export default class dropdown extends Component {

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

    render() {
        const {options, id, required} = this.props;
        let canRemove = false;
        if (options) {
            canRemove = options.length > 1 ? true : false;
        }
        return(
            <div className='options'>
                {options.map((option, index) => {
                    return(
                        <DropDownOption key={index} index={index} option={option} id={id} onChange={this.handleOptionChange} canRemove={canRemove}/>
                    )})}
                    <div className='more-options'>
                        <input type='text' className='another-box' ref={this.nameBoxRef} placeholder='Add option' onFocus={this.handleAnotherFocus} />
                    </div>
                <div className='required-check'>
                    <input type='checkbox' className='required-button' checked={required} onChange={this.handleRequireChange} /> Required
                </div>
            </div>
        )
    }
}

class DropDownOption extends Component {
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
                <div>
                    <input type='text' ref={element => this.optionRef = element} className='option-text' value={option} onChange={this.handleChange} onFocus={this.handleFocus} />
                    <span className='bar' />
                </div>
                {canRemove ? <span className="remove-option" onClick={this.handleRemoveClick}>&times;</span> : null}
            </div>
        )
    }
}