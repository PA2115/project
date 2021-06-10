import { useTheme } from '@material-ui/core/styles';

import React, {useEffect, useState} from "react";

import Chart from "react-google-charts";



export default function CPA() {



    const [params, getParams] = useState([]);

    const grab = async() =>
    {
        try{
            const response = await fetch("http://localhost:3001/calcCPA", {
                method: "POST",
            })
            const jsonData = await response.json()

            getParams(jsonData)

        }catch(err){
            console.error(err.message)
        }

    }

    useEffect(() => {
        grab();
    }, []);

    const chartData = [['offer name', 'category', 'cpa']]
    for (let i = 0; i < params.length; i ++) {

        chartData.push([params[i].offer_name,  params[i].industries_name, params[i].example_count])
    }

    return (
        <Chart
            width={'500px'}
            height={'300px'}
            chartType="Bar"
            loader={<div>Loading Chart</div>}
            data={chartData}
            options={{
                // Material design options
                chart: {
                    title: 'Estimated CPA per offer',
                },
            }}
            chartWrapperParams={{ view: { columns: [0,2] } }}
            controls={[
                {
                    controlType: 'CategoryFilter',
                    options: {
                        filterColumnIndex: 1,
                        ui: {
                            //labelStacking: 'vertical',
                            label: 'Filter by Category:',
                            allowTyping: false,
                            allowMultiple: false,
                        },
                    },
                },
            ]}
        />
    );
}

function OfferReach() {


    const [results, getResult] = useState([]);

    const grab = async() =>
    {
        try{
            const response = await fetch("http://localhost:3001/sharedTransactions", {
                method: "POST",
            })
            const jsonData = await response.json()

            getResult(jsonData)

        }catch(err){
            console.error(err.message)
        }

    }

    useEffect(() => {
        grab();
    }, []);

    const chartData = [['Reach', 'Suburb', 'State']]
    for (let i = 0; i < results.length; i ++) {
        chartData.push([results[i].location_region, results[i].location_state, results[i].reach])
    }

    return (
        <Chart
            width={'500px'}
            height={'300px'}
            chartType="Bar"
            loader={<div>Loading Chart</div>}
            data={chartData}
            options={{
                // Material design options
                chart: {
                    title: 'Overall Reach',
                },
            }}
            chartWrapperParams={{ view: { columns: [0, 2] } }}
            controls={[
                {
                    controlType: 'CategoryFilter',
                    options: {
                        filterColumnIndex: 1,
                        ui: {
                            //labelStacking: 'vertical',
                            label: 'Filter by State:',
                            allowTyping: false,
                            allowMultiple: false,
                        },
                    },

                },
            ]}
        />
    );
}

export {
    OfferReach,
}

