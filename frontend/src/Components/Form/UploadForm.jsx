import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const[gender, setGender] = useState('')
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('price', price);
    formData.append('gender', gender)
    formData.append('desc', desc)
    formData.append('image', image);

    setTitle('')
    setPrice('')
    setGender(null)
    setDesc('')
    setImage(null)

    try {
      await axios.post('http://localhost:3000/upload', formData);
      console.log('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit}>
      
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br /><br />
      <input
        type="text"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <br /><br />
      <label htmlFor="lname">Gender: </label>
          <input type="radio" name="gender" value="male" onChange={(e)=>setGender(e.target.value)}/> Male
          <input type="radio" name="gender" value="female" onChange={(e)=>setGender(e.target.value)}/> Female
      <br /><br />
      <textarea
        type="text"
        placeholder="Description"
        value={desc} rows={10} column={10}
        onChange={(e) => setDesc(e.target.value)}
      />
      <br /><br />
      <input type="file" onChange={handleImageChange} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
