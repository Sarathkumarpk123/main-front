import React, { useState } from 'react';
import './Addfood.css';
import { toast } from 'react-hot-toast';

export const Addfood = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '', // Changed from null to an empty string
    category: '',
    isVeg: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleVegChange = (e) => {
    setFormData({
      ...formData,
      isVeg: e.target.value === 'true',
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onloadend = () => {
      setFormData({
        ...formData,
        image: reader.result, // Store base64 string of the image
      });
    };

    if (file) {
      reader.readAsDataURL(file); // Convert image to base64
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate that an image file is selected
    if (!formData.image) {
      toast.error("Please select an image.");
      return;
    }
  
    const formDataToSend = {
      name: formData.name,
      description: formData.description,
      price: formData.price,
      image: formData.image, // Send base64 string of the image
      category: formData.category,
      isVeg: formData.isVeg,
    };
  
    try {
      const response = await fetch('http://localhost:3000/foodrest1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set content type to JSON
        },
        body: JSON.stringify(formDataToSend), // send JSON data
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const newFood = await response.json();
      toast.success('Food added successfully!');
      setFormData({
        name: '',
        description: '',
        price: '',
        image: '', // Reset image field
        category: '',
        isVeg: true,
      });
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <div className="add-food-container">
      <h2>Add New Food</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Food Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Is Vegetarian?</label>
          <div>
            <label>
              <input
                type="radio"
                name="isVeg"
                value="true"
                checked={formData.isVeg === true}
                onChange={handleVegChange}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="isVeg"
                value="false"
                checked={formData.isVeg === false}
                onChange={handleVegChange}
              />
              No
            </label>
          </div>
        </div>

        <button type="submit">Add Food</button>
      </form>
    </div>
  );
};

export default Addfood; 