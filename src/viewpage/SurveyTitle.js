import React, { Component } from 'react';
import '../Assets/Forms.css';

export default class TitleObject extends Component {
    render() {
        const {title, description} = this.props;
        return(
            <div className='title-object'>
                <div className='title-display'>
                    {title}
                </div>
                <div className='description-display'>
                    {description}
                </div>
            </div>
        )
    }
}