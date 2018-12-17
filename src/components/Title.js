import React, { Component } from 'react';
import FormActions from '../actions/FormActions';
import '../Assets/Forms.css';
import {debounce} from 'underscore';

export default class TitleObject extends Component {
    titleRef = React.createRef();
    descriptionRef = React.createRef();

    handleChange = debounce(() => {
        const {id, formId} = this.props;
        const titleVal = this.titleRef.current.value;
        const descriptionVal = this.descriptionRef.current.value;

        FormActions.updateTitle(id, titleVal, descriptionVal, formId);
    }, 2000)

    handleFocusTitle = () => {
        this.titleRef.current.select();
    }

    handleFocusDescription = () => {
        this.descriptionRef.current.select();
    }

    render() {
        const {title, description} = this.props;
        return(
            <div className='title-object'>
                <input type='text' ref={this.titleRef} className='title-entry' defaultValue={title} onChange={this.handleChange} onFocus={this.handleFocusTitle} />
                <span className='bar' />
                <input type='description' ref={this.descriptionRef} className='description-entry' defaultValue={description} onChange={this.handleChange} onFocus={this.handleFocusDescription} />
                <span className='bar' />
            </div>
        )
    }
}