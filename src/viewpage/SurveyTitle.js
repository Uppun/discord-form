import React, { Component } from 'react';
import '../Assets/Forms.css';

export default class TitleObject extends Component {
    render() {
        const {title, description, id, hasRequired} = this.props;
        return(
            <div className='title-object'>
                <div className='title-display'>
                    {title}
                </div>
                <div className='description-display'>
                    {description}
                </div>
                {(id === 0) && hasRequired ?
                <div className='required-notice'>* Required</div> :
                null}
            </div>
        )
    }
}