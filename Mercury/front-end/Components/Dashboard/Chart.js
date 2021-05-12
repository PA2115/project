import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';


// Generate Sales Data
function createData(month, amount) {
    return { month, amount };
}

const data = [
    createData('Jan', 0),
    createData('Feb', 15),
    createData('Mar', 35),
    createData('Apr', 60),
    createData('May', 20),
    createData('Jun', 25),
];

const test = [

    createData('Jan', 0),
    createData('Feb', 100),
    createData('Mar', 100),
    createData('Apr', 200),
    createData('May', 300),
    createData('Jun', 300),



];

export default function Chart() {
    const theme = useTheme();

    return (
        <React.Fragment>
            <Title>Overview - Offer Performance</Title>
            <ResponsiveContainer>
                <LineChart
                    data={data}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 0,
                        left: 24,
                    }}
                >
                    <XAxis dataKey="month" stroke={theme.palette.text.secondary} />
                    <YAxis stroke={theme.palette.text.secondary}>
                        <Label
                            angle={270}
                            position="left"
                            style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
                        >
                            Sales ($)
                        </Label>
                    </YAxis>
                    <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}

function TestChart() {
    const theme = useTheme();

    return (
        <React.Fragment>
            <Title>Overview - Offer Reach</Title>
            <ResponsiveContainer>
                <LineChart
                    data={test}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 0,
                        left: 24,
                    }}
                >
                    <XAxis dataKey="month" stroke={theme.palette.text.secondary} />
                    <YAxis stroke={theme.palette.text.secondary}>
                        <Label
                            angle={270}
                            position="left"
                            style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
                        >
                            Estimated Reach
                        </Label>
                    </YAxis>
                    <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}

export{
    TestChart,
}