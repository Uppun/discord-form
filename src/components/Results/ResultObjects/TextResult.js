import React, {Component} from 'react';
import '../Results.css';

export default class TextResult extends Component {
    render() {
        const {responses, question} = this.props;
        return (
            <div className='text-result'>
                <div className='response-question-text'>
                    {question}
                </div>
                {responses ? responses.map((response, index) => {
                    return <SingleTextBox key={index} user={response.username} icon={response.icon} userId={response.userId} response={response.response} />
                }):
                null}
            </div>
        );
    }
}

class SingleTextBox extends Component {
    render() {
        const {user, response, userId, icon} = this.props;
        const imgSrc = `https://cdn.discordapp.com/avatars/${userId}/${icon}.jpg`
        return (
            <div className='text-response-box'>
                <div className='text-response-user'>
                    <img className='result-icon-image-mini' src={imgSrc} alt='icon' /> 
                    <div className='text-response-user-name'>{user}</div>
                </div>
                <div className='text-response-response'>
                    {response}
                </div>
            </div>
        );
    }
}