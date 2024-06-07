import MainCard from 'ui-component/cards/MainCard';
import useCrowdFundingContract from 'hooks/useCrowdFundingContract';
import { useEffect, useState } from 'react';
import { useAddress } from '@thirdweb-dev/react';
import parseCampaigns from 'utils/parse-campaigns';
import { Typography, Grid, Box, CircularProgress } from '@mui/material';
import FundCard from './fund-card';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const address = useAddress();
  const { contract, isLoading, error } = useCrowdFundingContract();
  console.log(contract);
  const [campaigns,setCampaigns] = useState([]);
  const navigate=useNavigate();

  useEffect(() => {
    const fetchCampaigns = async () => {
      const campaigns = await contract.call('getCampaigns');
      console.log(campaigns);
      const parsedCampaigns = parseCampaigns(campaigns);
      console.log(parsedCampaigns);
      setCampaigns(parsedCampaigns);
    };
    if (isLoading == false) {
      fetchCampaigns();
    }
  }, [isLoading]);

  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };

  if (!address) {
    return (
      <MainCard title="Create Campaign">
        <Typography variant="h6" color={'red'}>
          Please connect your wallet to create a campaign
        </Typography>
      </MainCard>
    );
  }

  return (
    <MainCard title="Home">
      <Typography variant="h6" color="textPrimary">
        ({campaigns.length})
      </Typography>

      <Grid container spacing={3} sx={{ marginTop: 2 }}>
        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <CircularProgress />
          </Box>
        )}

        {!isLoading && campaigns.length === 0 && (
          <Typography variant="body1" color="textSecondary">
            You have not created any campaigns yet.
          </Typography>
        )}

        {!isLoading &&
          campaigns.length > 0 &&
          campaigns.map((campaign) => (
            <Grid item xs={12} sm={6} md={3} key={campaign.pId}>
              <FundCard
                title={campaign.title}
                description={campaign.description}
                image={campaign.image}
                target={campaign.target}
                amountCollected={campaign.amountcollected}
                handleClick={() => handleNavigate(campaign)}
              />
            </Grid>
          ))}
      </Grid>
    </MainCard>
  );
};

export default Home;
