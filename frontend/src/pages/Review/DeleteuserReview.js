import React from "react";
import axios from "axios";

const DeleteuserReview = ({ feedbackId, onDeleteuserReview }) => {
  
  const handleDelete = async () => {
    try {
      
      await axios.delete(`http://localhost:8080/userReview/deletefeedback/${feedbackId}`);
      
      onDeleteuserReview();
      
      alert("Feedback deleted successfully!");
    } catch (error) {
      
      console.error("Error deleting Feedback.", error.message);
      alert("Error deleting feedback. Please try again.");
    }
  };

  return (
  
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <button type="button" className="btn" style={{ backgroundColor: "#ffcccc", color: "#ff0000", border: "none", padding: "8px 16px", borderRadius: "4px", cursor: "pointer" }} onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default DeleteuserReview;
