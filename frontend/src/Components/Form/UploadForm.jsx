import React, { useState } from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Container, Grid } from '@mui/material';

const Form = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [image, setImage] = useState(null);

  const [input, setInput] = useState({
    title: '',
    price: '',
    gender: '',
    desc: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageUrl(reader.result);
    };

    reader.readAsDataURL(file);
    setImage(file);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(input);

    const formData = new FormData();
    formData.append('title', input.title);
    formData.append('price', input.price);
    formData.append('gender', input.gender);
    formData.append('desc', input.desc);
    formData.append('file', image);

    try {
      await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Data uploaded successfully!', formData);
    } catch (error) {
      console.error('Error uploading data:', error);
    }
  };

  const genders = [
    {
      value: 'Male',
      label: 'M',
    },
    {
      value: 'Female',
      label: 'F',
    },
  ];

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{padding: "40px 300px"}}
    >
      <Grid style={{display:'grid', direction: "row"}} >
        {/* Text Inputs */}
        <TextField
          id="filled-multiline-flexible"
          label="Title"
          multiline
          maxrows={4}
          variant="filled"
          name="title"
          onChange={handleChange}
          value={input.title}
          fullWidth
        />
        <br />
        <TextField
          id="filled-textarea"
          label="Price"
          placeholder="Placeholder"
          multiline
          variant="filled"
          name="price"
          onChange={handleChange}
          value={input.price}
        />
        <br />
        <TextField
          id="filled-select-currency"
          select
          label="Select"
          defaultValue="Male"
          helperText="Please select the gender"
          variant="filled"
          name="gender"
          value={input.gender}
          onChange={handleChange}
        >
          {genders.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <br />
        <TextField
          id="filled-multiline-static"
          label="Description"
          multiline
          rows={4}
          variant="filled"
          name="desc"
          value={input.value}
          onChange={handleChange}
        />

        {/* Image Input */}
        <Stack direction="row" alignItems="center" spacing={2} sx={{margin: "5px "}}>
          <label htmlFor="upload-image">
            <Button variant="contained" component="span">
              Choose Image
            </Button>
            <input
              id="upload-image"
              hidden
              accept="image/*"
              type="file"
              name="image"
              onChange={handleFileUpload}
            />
          </label>
          {imageUrl && (
            <img src={imageUrl} alt="Uploaded Image" height="300" />
          )}
        </Stack>
        <Button variant='contained' sx={{ marginTop: 2, width: "50vw", margin: "0 200px"}} type="submit" onClick={handleClick}>
        Submit
      </Button>
      </Grid>

      
    </Box>
  );
};

export default Form;
