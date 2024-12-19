import { useEffect, useState } from "react";
import "./announceCards.css";
import { useLocation, useNavigate } from 'react-router';
import axios from "axios";

import Brands from "../../assets/brand.json";
import Models from "../../assets/Models.json"; // Corrected file path

export function AnnounceElement () {
  const [announces, setAnnounces] = useState([]);
  const [brandName, setBrandName] = useState("");
  const [modelName, setModelName] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const announceId = new URLSearchParams(location.search).get("id"); // Extract ID from query string

  useEffect(() => {

    if(!localStorage.getItem("token")) {
      window.location.assign("/login");
    }

    // Fetch announces data
    axios.get("http://localhost:3001/announces", {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
      }
    }).then((response) => {
      setAnnounces(response.data);
    }).catch((error) => {  
      console.log(error);
    });
  }, []);

  const announce = announces.find(announce => announce._id === announceId);

  // UseEffect to set brand and model names only when 'announce' is found
  useEffect(() => {
    if (announce) {
      const brand = Brands.find((brand) => brand._id === announce.brand);
      const model = Models.find((model) => model._id === announce.model);


      setBrandName(brand ? brand.name : "Unknown Brand");
      setModelName(model ? model.name : "Unknown Model");
    }
  }, [announce]); // Dependency array set to 'announce' to avoid unnecessary re-renders

  // Handle delete operation
  const handleDelete = () => {
    if (!announce) return;  // Ensure announce exists before making the request

    console.log(announce._id);  

    axios
      .delete(`http://localhost:3001/announce/${announce._id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.data.result) {
          alert("Announcement deleted");
          window.location.assign("/home");
        } else {
          alert(response.data.error);
        }
      });
  };

  // Handle case when announce is not found
  if (!announce) {
    return <p>Announcement not found</p>;
  }

  return (
    <div className="announceContainer">
      <div className="announceCardPage">
        <span className="announceHeader">
          <h1>{announce.title}</h1>
          <h3>{announce.type}</h3>
        </span>
        <p><strong>Author:</strong> {announce.author.username}</p>
        <p className="descriptionChamp">{announce.description}</p>
        <div className="details">
          <p><strong>Brand:</strong> {brandName}</p>
          <p><strong>Model:</strong> {modelName}</p>
          <p><strong>Kilometers:</strong> {announce.km} km</p>
          <p><strong>Year:</strong> {announce.year}</p>
        </div>
        <span className="buttonsCard">
          <button onClick={handleDelete} className="deleteAnnounceBtn">
            Delete Announcement
          </button>
          <button onClick={() => navigate(`/home/editannounce?id=${announce._id}`)} className="deleteAnnounceBtn">
            Modify Announce
          </button>

        </span>
      </div>
    </div>
  );
}

export function AnnounceCards({ announces }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.assign("/login");
    }
  }, []);

  if (announces.length === 0) {
    return <p>No Announcements available</p>;
  }

  return announces.map((announce, index) => {
    return (
      <div className="announceCard" key={index}>
        <span className="announceHeader">
          <h1>{announce.title}</h1>
          <h3>{announce.type}</h3>
        </span>
        <div className="details2">
          <p><strong>Author:</strong> {announce.author.username}</p>
          <p><strong>Year:</strong> {announce.year}</p>
          <p><strong>Kilometers:</strong> {announce.km} km</p>
        </div>
        <p onClick={() => navigate(`/home/announce?id=${announce._id}`)} className="seemore">
          See more...
        </p>
      </div>
    );
  });
}
