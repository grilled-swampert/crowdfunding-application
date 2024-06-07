import MainCard from 'ui-component/cards/MainCard';
import { FileUploader } from 'react-drag-drop-files';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { useAddress, useContractWrite, useStorageUpload } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import useCrowdFundingContract from 'hooks/useCrowdFundingContract';
import moment from 'moment';
import { useState } from 'react';

const CreateCampaign = () => {
  const navigate = useNavigate();
  const { contract, error } = useCrowdFundingContract();
  const { mutateAsync: upload } = useStorageUpload();
  const address = useAddress();
  const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: ''
  });

  const [imageFile, setImgeFile] = useState(null);

  const fileTypes = ['JPG', 'JPEG', 'PNG', 'GIF'];

  const handleImageChange = (file) => {
    setImgeFile(file);
  };

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const getTodayDate = () => {
    return moment().format('YYYY-MM-DD');
  };

  const uploadImage = async () => {
    const dataToUpload = [imageFile];
    const uris = await upload({ data: dataToUpload });
    console.log(uris);
    return uris[0];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const imageURI = await uploadImage();
      setForm({ ...form, image: imageURI });

      const targetInWei = ethers.utils.parseEther(form.target);

      // add data

      const data = await createCampaign({
        args: [address, form.title, targetInWei, form.description, new Date(form.deadline).getTime(), imageURI.toString()]
      });
      console.log('transaction:', data);
      alert('New Campaign Created Successfully');
      navigate('/home');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
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
    <MainCard title="Create Campaign">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item md={6} sm={12}>
          <FileUploader handleChange={handleImageChange} name="image" types={fileTypes} multiple={false} style={{ width: '100%' }} />

            {imageFile && (
              <Box sx={{ mt: 2, mb: 2 }}>
                <Typography>Image Preview: </Typography>
                <img src={URL.createObjectURL(imageFile)} alt="" style={{ width: '100%', borderRadius: '10px' }} />
              </Box>
            )}
          </Grid>

          <Grid item md={6} sm={12}>
            <TextField
              fullWidth
              label="Title"
              variant="outlined"
              //   margin="normal"
              value={form.title}
              onChange={(e) => handleFormFieldChange('title', e)}
            />
            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              margin="normal"
              value={form.description}
              onChange={(e) => handleFormFieldChange('description', e)}
            />
            <TextField
              fullWidth
              label="Target Amount (ETH)"
              variant="outlined"
              margin="normal"
              value={form.target}
              onChange={(e) => handleFormFieldChange('target', e)}
            />
            <TextField
              fullWidth
              label="Deadline"
              variant="outlined"
              margin="normal"
              type="date"
              InputLabelProps={{ shrink: true }}
              inputProps={{ min: getTodayDate() }}
              value={form.deadline}
              onChange={(e) => handleFormFieldChange('deadline', e)}
            />
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button variant="contained" color="primary" type="submit" disabled={isLoading} sx={{ mr: 2 }}>
            {isLoading ? <CircularProgress size={24} /> : 'Create Campaign'}
          </Button>
          <Button variant="outlined" onClick={() => navigate('/')}>
            Cancel
          </Button>
        </Box>
      </form>
    </MainCard>
  );
};

export default CreateCampaign;
