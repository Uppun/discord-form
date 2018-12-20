import React, { Component } from 'react';
import '../../../Assets/Forms.css';
import {Container} from 'flux/utils';
import AnswerStore from '../../../stores/AnswerStore';
import FormActions from '../../../actions/FormActions';
import Select from 'react-select';

const dot = () => ({
    alignItems: "center",
    display: "flex",
    color: "white",
    width: 200,
  });

const selectStyle = {
    control: styles => ({
        ...styles, 
        backgroundColor: '#23272A',
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected}) => {
        return {
            ...styles,
            backgroundColor: isDisabled
                ? null
                : isSelected
                    ? '#7289DA'
                    : isFocused
                        ? '#7289DA'
                        : '#23272A',
            color: 'white',
            cursor: isDisabled ? 'not-allowed' : 'default'
        };
    },
    input: styles => ({ ...styles, ...dot() }),
    placeholder: styles => ({ ...styles, ...dot() }),
    singleValue: (styles, { data }) => ({ ...styles, ...dot() }),
    menuList: styles => {
        return {
            ...styles,
            backgroundColor: '#23272A',
            boxShadow: '2px 2px 2px black',
        }
    }
}

class DropDown extends Component {
    static getStores() {
        return [AnswerStore];
    }
    
    static calculateState(prevState) {
        return {
            ...AnswerStore.getState(),
        };
    }

    handleChange = (event) => {
        FormActions.updateAnswer(this.props.id, event.value);
    }

    render() {
        const {options, id} = this.props;
        const {AnswersMap} = this.state;
        const currentVal = AnswersMap.get(id.toString());
        const value = currentVal ? 
            {value: currentVal , label: currentVal}
            : {value: '', label: 'Select One'};
        const optionsArray = [];

        for (const option of options) {
            optionsArray.push({
                value: option,
                label: option,
            });
        }

        return(
            <div className='survey-dropdown-choice-options'>
                <Select
                    value={value}
                    name={id}
                    onChange={this.handleChange}
                    label='Single select'
                    options={optionsArray}
                    styles={selectStyle}
                />

            </div>
        )
    }
}

export default Container.create(DropDown);