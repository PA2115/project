import React from 'react';

// import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';



// Generate Order Data
function createData(id, name, industry, type) {
    return { id, name, industry, type};
}

const rows = [
    createData(0, 'Buy One Get One free Coke', 'Food & Beverage', 'BOGO (Buy One Get One)'),
    createData(1, '4th tyre 50% off', 'Motor', 'Percentage off'),
    createData(2, 'Half price pies', 'Food & Beverage', 'Price reduction'),
];

// const useStyles = makeStyles((theme) => ({
//     seeMore: {
//         marginTop: theme.spacing(3),
//     },
// }));

export default function OfferWallet() {



    return (
        <React.Fragment>
            <Title>Suggested Offers</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Offer name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Industry</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id} >
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.industry}</TableCell>
                            <TableCell>{row.type}</TableCell>
                            <TableCell><button onClick={(event) =>{

                                event.stopPropagation();
                                fetch("http://localhost:3001/", {
                                    method: "POST",
                                    body: JSON.stringify({
                                        name: row.name,
                                        industry: row.industry,
                                        type: row.type
                                    }),
                                    headers:{
                                       "Content-type": "application/json; charset=UTF-8"
                                    }



                                })

                            }}>Distribute Offer
                            </button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>

    );

            }





