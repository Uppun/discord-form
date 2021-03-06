import React, {Component} from 'react';
import Chart from 'react-google-charts';
import '../Results.css';

export default class DropResult extends Component {
    render() {
        const data = [['answer', 'aggregate']];
        for (const [answer, aggregate] of this.props.options.entries()) {
            data.push([Array.isArray(answer) ? answer[0] : answer, aggregate]);
        }
        const {question} = this.props;
        return(
            <div className='drop-result'>
                <div className='response-chart'>
                    <Chart
                        width={500}
                        height={500}
                        chartType='BarChart'
                        loader={<div className='loading-result'>Loading Responses...</div>}
                        data={data}
                        legendToggle
                        backgroundColor='#2C2F33'
                        options={{
                            title: question,
                            titleTextStyle: {
                                color: 'white',
                                fontSize: 20,
                            },
                            legend: 'none',
                            backgroundColor: { 
                                fill:'#2C2F33',
                            },
                            hAxis: {
                                gridlines: {
                                    color: '#A9A9A9',
                                },
                                baselineColor: 'white',
                                minorGridlines: {
                                    color: '#555555',
                                },
                                textStyle: {
                                    color: 'white'
                                },
                            },
                            vAxis: {
                                gridlines: {
                                    color: '#A9A9A9',
                                },
                                baselineColor: 'white',
                                minorGridlines: {
                                    color: '#555555',
                                },
                                textStyle: {
                                    color: 'white'
                                },
                            }
                        }}
                    />
                </div>
            </div>
        );
    }
}