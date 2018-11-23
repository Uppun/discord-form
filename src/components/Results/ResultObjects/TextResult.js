import React, {Component} from 'react';

export default class TextResult extends Component {
    render() {
        const {responses} = this.props;
        return (
            <div className='text-result'>
                {responses ? responses.map((response, index) => {
                    return <SingleTextBox key={index} user={response.username} response={response.response} />
                }):
                null}
            </div>
        );
    }
}

class SingleTextBox extends Component {
    render() {
        const {user, response} = this.props;
        return (
            <div className='text-response-box'>
                <h1 className='text-response-user'>{user}</h1>
                <div className='text-response-response'>{response}</div>
            </div>
        );
    }
}