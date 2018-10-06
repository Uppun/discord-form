import React, { Component } from 'react';
import '../../../Assets/Forms.css';

export default class dropdown extends Component {
    render() {
        const {options} = this.props;
        return(
            <div className='survey-dropdown-choice-options'>
                <select>
                    {options.map(option => {
                        return(
                            <option value='survey-option'>{option}</option>
                        )})}
                </select>
            </div>
        )
    }
}