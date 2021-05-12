import React from "react";
import Chart from "react-google-charts";







// Doughnut
function DoughnutChart() {


    return(


        <Chart
            width={'300px'}
            height={'300px'}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={[
                ['Location', 'total offer takeup'],
                ['Parramatta', 11],
                ['Castle Hill', 5],
                ['Pyrmont', 3],
                ['Burwood', 1],
            ]}
            options={{
                title: 'Popular redemption locations',
                pieHole: 0.3,
            }}
            rootProps={{ 'data-testid': '3' }}
        />
    );



}


export default DoughnutChart;