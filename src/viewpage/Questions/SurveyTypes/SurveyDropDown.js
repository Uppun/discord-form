import React, { Component } from 'react';
import '../../../Assets/Forms.css';

export default class dropdown extends Component {
    render() {
        const {options} = this.props;
        return(
            <div className='survey-dropdown-choice-options'>
                <select>
                    {options.map((option, index) => {
                        return(
                            <option value='survey-option' key={index}>{option}</option>
                        )})}
                </select>
            </div>
        )
    }
}