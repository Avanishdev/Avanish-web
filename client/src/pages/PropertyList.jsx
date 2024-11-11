import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext.js";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { user } = useAuth();
  const BASE_URL = "localhost:8080";

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/v1/properties/buyer/get?page=${page}&limit=10`
        );
        setProperties(response.data.properties);
        setTotalPages(response.data.pages);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, [page]);

  const handleInterestedClick = async (propertyId) => {
    if (!user) {
      alert("Please log in to express interest in properties");
      window.location.href = "/login";
      return;
    }

    try {
      await axios.post(
        `/api/properties/${propertyId}/interested`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert("Interest expressed. Check your email for seller details.");
    } catch (error) {
      console.error("Error expressing interest:", error);
    }
  };

  const handleLikeClick = async (propertyId) => {
    if (!user) {
      alert("Please log in to like properties");
      window.location.href = "/login";
      return;
    }

    try {
      const response = await axios.post(
        `/api/properties/${propertyId}/like`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const updatedProperty = response.data;
      setProperties((prevProperties) =>
        prevProperties.map((property) =>
          property._id === propertyId ? updatedProperty : property
        )
      );
    } catch (error) {
      console.error("Error liking property:", error);
    }
  };

  return (
    <div>
      <h1>Properties</h1>
      <ul>
        {properties.map((property) => (
          <li key={property._id}>
            <h2>{property.title}</h2>
            <p>{property.description}</p>
            <p>Price: {property.price}</p>
            <p>Likes: {property.likes}</p>
            <button onClick={() => handleInterestedClick(property._id)}>
              Interested
            </button>
            <button onClick={() => handleLikeClick(property._id)}>Like</button>
          </li>
        ))}
      </ul>
      <div>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PropertyList;
