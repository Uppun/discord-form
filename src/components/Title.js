import React, { Component } from 'react';
import FormActions from '../actions/FormActions';
import '../Assets/Forms.css';

export default class TitleObject extends Component {
    titleRef = React.createRef();
    descriptionRef = React.createRef();

    handleChange = () => {
        const {id} = this.props;
        const titleVal = this.titleRef.current.value;
        const descriptionVal = this.descriptionRef.current.value;

        FormActions.update_title(id, titleVal, descriptionVal);
    }

    render() {
        const {title, description} = this.props;
        return(
            <div className='title-object'>
                <input type='text' ref={this.titleRef} className='title-entry' defaultValue={title} onChange={this.handleChange} />
                <span className='bar' />
                <input type='description' ref={this.descriptionRef} className='description-entry' defaultValue={description} onChange={this.handleChange} />
                <span className='bar' />
            </div>
        )
    }
}