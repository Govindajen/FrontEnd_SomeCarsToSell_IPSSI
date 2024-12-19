import axios from "axios";
import { useEffect, useState } from "react";
import "../../pages/Announce/cAnnounce.css";

import Brands from '../../assets/brand.json';
import Models from '../../assets/models.json';
import { useNavigate } from "react-router-dom";

export default function CreateAnnounce() {

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.assign("/login");
    }
  }, []);


    const Navigate = useNavigate();
  const [formData, setFormData] = useState(
    {
    author: "",  
    title: "",
    type: "",
    price: 0,
    brand: "",
    model: "",
    km: 0,
    year: 0,
    description: ""
  }
);

  const [filteredModels, setFilteredModels] = useState([]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // When the brand changes, filter models based on the selected brand
    if (name === "brand") {
      // Ensure Models data has brandId property to match
      const modelsForSelectedBrand = Models.filter(model => model.brandId === value);
      setFilteredModels(modelsForSelectedBrand);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      // If token doesn't exist, you can handle the error here
      if (!token) {
        alert("You must be logged in to create an announcement.");
        return;
      }

      const response = await axios.post('http://localhost:3001/announce', formData, {
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      });

      if (response.data.result) {
        alert('Announcement created successfully!');
        setFormData({
          title: "",
          type: "",
          price: 0,
          brand: "",
          model: "",
          km: 0,
          year: 0,
          description: ""
        });
        Navigate('/home');
      }
    } catch (error) {
      console.error("Error creating announcement:", error);
      alert("There was an error creating the announcement.");
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-heading">Create an Announcement</h1>
      <form className="announce-form" onSubmit={handleSubmit}>
  
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
  
        <div className="form-group">
        <label htmlFor="type">Type</label>
            <select
                name="type"
                id="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="form-input"
            >
                <option value="">Select a type</option>
                <option value="car">Car</option>
                <option value="moto">Moto</option>
            </select>
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="brand">Brand</label>
          <select
            name="brand"
            id="brand"
            value={formData.brand}
            onChange={handleChange}
            required
            className="form-input"
          >
            <option value="">Select a brand</option>
            {Brands.map((brand) => (
              <option key={brand._id} value={brand._id}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="model">Model</label>
          <select
            name="model"
            id="model"
            value={formData.model}
            onChange={handleChange}
            required
            className="form-input"
            disabled={!formData.brand}  // Disable if no brand is selected
          >
            <option value="">Select a model</option>
            {filteredModels.map((model) => (
              <option key={model._id} value={model._id}>
                {model.name}
              </option>
            ))}
          </select>
        </div>
  
        <div className="form-group">
          <label htmlFor="km">Kilometers</label>
          <input
            type="number"
            name="km"
            id="km"
            value={formData.km}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
  
        <div className="form-group">
          <label htmlFor="year">Year</label>
          <input
            type="number"
            name="year"
            id="year"
            value={formData.year}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
  
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="form-input"
          ></textarea>
        </div>
  
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
}
