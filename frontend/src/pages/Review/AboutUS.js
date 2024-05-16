import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; 
import StarRating from "./StarRating";
import Navigation from '../Navigation';
import './Aboutus.css';

function AboutUS() {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [highRatingCount, setHighRatingCount] = useState(0); 

  useEffect(() => {
  
    axios.get("http://localhost:8080/userReview/")
      .then((response) => {
        setReviews(response.data);
        
        if (response.data.length > 0) {
          const totalRating = response.data.reduce((acc, review) => acc + review.rating, 0);
          setAverageRating(totalRating / response.data.length);

          
          const highRatingReviews = response.data.filter(review => review.rating > 4);
          setHighRatingCount(highRatingReviews.length);
        }
      })
      .catch((error) => console.error("Error fetching reviews:", error));
  }, []);

  return (
    <div >
        <Navigation />
    <div className="aboutus-root">
      <h1 className="aboutus-heading">About Us</h1>
      <p className="aboutus-description">
      

      Welcome to KAYA, your partner for seamless travel experiences. With a passion for exploration and commitment to excellence, we craft tailor-made adventures to suit your desires. Whether it's the thrill of exotic destinations, serene landscapes, or cultural immersion, we're here to make your dreams real. Our dedicated team ensures every moment is filled with excitement, discovery, and relaxation. Join us at KAYA and let's redefine your journey.
      </p>
      <div className="aboutus-container">
        <div className="aboutus-card">
          <div className="aboutus-card-header">
            Reputable
          </div>
          <div className="aboutus-card-body">
            <p className="aboutus-card-text">
              <small className="aboutus-card-small">
                At KAYA, we value your feedback and strive to provide exceptional service. Share your experience with us through reviews and feedback. Your input helps us enhance our services and tailor them to your needs. Whether it's a suggestion, comment, or compliment, we welcome your thoughts and opinions. Together, we can create memorable and seamless travel experiences for everyone.
              </small>
            </p>
            <div className="aboutus-rating">
              <StarRating rating={averageRating} />
              <span className="aboutus-rating-info"> : {averageRating.toFixed(2)} , </span>
              <span className="aboutus-rating-count">{highRatingCount} reviews with rating ≥ ★★★★</span>
            </div>
            
            <Link to="/cusreview" className="aboutus-button">Customer Feedback</Link>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default AboutUS;
