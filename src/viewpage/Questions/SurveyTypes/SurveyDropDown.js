import React, { Component } from 'react';
import '../../../Assets/Forms.css';

export default class dropdown extends Component {
    render() {
        const {options, id} = this.props;
        return(
            <div className='survey-dropdown-choice-options'>
                <select name={id}>
                    {options.map((option, index) => {
                        return(
                            <option value={option} key={index}>{option}</option>
                        )})}
                </select>
            </div>
        )
    }
}