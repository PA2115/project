import Title from "./Title";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import React, {useEffect, useState} from "react";



 function DistributedOffers() {

     const [offers, getOffer] = useState([]);

     const getAllOffers = async() =>
     {
         try{
             const response = await fetch("http://localhost:3001/test")
             const jsonData = await response.json()
             getOffer(jsonData)
         }catch(err){
             console.error(err.message)
         }


     }


     useEffect(() => {
         getAllOffers();
     }, []);


        return (
            <React.Fragment>
                <Title>Distributed Offers</Title>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Offer name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Industry</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {offers.map((offer) =>(
                            <TableRow key={offer.id} >
                                <TableCell>{offer.name}</TableCell>
                                <TableCell>{offer.industry}</TableCell>
                                <TableCell>{offer.type}</TableCell>
                            </TableRow>
                        ))}
                     </TableBody>
                </Table>
            </React.Fragment>

        );



}

export default DistributedOffers