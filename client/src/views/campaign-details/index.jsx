import MainCard from "ui-component/cards/MainCard";
import { useLocation } from "react-router-dom";


const CampaignDetails = () =>{

    const {state}=useLocation();
    console.log(state);

    return(
        <MainCard
        title='Campaign Details'
        >
            Inside Campaign Details
        </MainCard>
    )
};

export default CampaignDetails;