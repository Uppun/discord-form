import React, {Component} from 'react';
import Chart from 'react-google-charts';

export default class DropResult extends Component {
    render() {
        const data = [['answer', 'aggregate']];
        for (const [answer, aggregate] of this.props.options.entries()) {
            data.push([answer, aggregate]);
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
                                    color: 'white',
                                },
                                minorGridlines: {
                                    color: 'white',
                                },
                                textStyle: {
                                    color: 'white'
                                },
                            },
                            vAxis: {
                                gridlines: {
                                    color: 'white',
                                },
                                minorGridlines: {
                                    color: 'white',
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