import React from "react";
import Chart from "react-google-charts";







// Doughnut by location
export default function LocDoughnutChart() {


    return(


        <Chart
            width={'400'}
            height={'240px'}
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
// Doughnut by category
function CatDoughnutChart() {


    return(


        <Chart
            width={'400'}
            height={'240px'}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={[
                ['Category', 'total redemption'],
                ['food and beverage', 50],
                ['cosmetics and health', 45],
                ['Homewares', 15],
            ]}
            options={{
                title: 'Best Performing Catergories',
                pieHole: 0.3,
            }}
            rootProps={{ 'data-testid': '3' }}
        />
    );



}

export{

    CatDoughnutChart,

}

