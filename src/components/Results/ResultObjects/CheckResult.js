import React, {Component} from 'react';
import Chart from 'react-google-charts';
import '../Results.css';

export default class CheckResult extends Component {
    render() {
        const data = [['answer', 'aggregate']];
        for (const [answer, aggregate] of this.props.options.entries()) {
            data.push([answer, aggregate]);
        }
        const {question} = this.props;
        return(
            <div className='check-result'>
                <div className='response-chart'>
                    <Chart
                        width={500}
                        height={500}
                        chartType='BarChart'
                        loader={<div className='loading-result'>Loading Responses...</div>}
                        data={data}
                        legendToggle
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