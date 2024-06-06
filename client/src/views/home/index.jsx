import MainCard from "ui-component/cards/MainCard";
import useCrowdFundingContract from "hooks/useCrowdFundingContract";
import { useEffect, useState } from "react";
import { useAddress } from "@thirdweb-dev/react";
import { Typography, Grid, Box, CircularProgress } from "@mui/material";

const Home = () => {
const address = useAddress();
const {contract, isLoading ,error} = useCrowdFundingContract();
console.log(contract);

    useEffect(() =>{
        const fetchCampaigns = async () => {
            const campaigns= await contract.call('getCampaigns');
            console.log(campaigns);
        };
        fetchCampaigns()
    },[])

    return(
    <MainCard
    title="Home"
    
    >

    </MainCard>
   )
};

export default Home;
