import React, {Component} from 'react';
import Chart from 'react-google-charts';

export default class CheckResult extends Component {
    render() {
        const data = [['answer', 'aggregate']];
        for (const [answer, aggregate] of this.props.options.entries()) {
            data.push([answer, aggregate]);
        }
        console.log(data)

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
                    />
                </div>
            </div>
        );
    }
}