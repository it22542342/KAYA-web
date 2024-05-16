import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import StarRating from "./StarRating";
import DeleteuserReview from "./DeleteuserReview";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf"; 
import Navigation from '../Navigation';
import './AdminReview.css';

const Admin = () => {
  const [allFeedback, setFeedback] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(""); 


  useEffect(() => {
    function getFeedback() {
      axios
        .get("http://localhost:8080/userReview/")
        .then((res) => {
          setFeedback(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }

    getFeedback();
  }, []);

  
  const handleDeleteuserReview = async (feedbackId) => {
    try {
      await axios.delete(`http://localhost:8080/userReview/deletefeedback/${feedbackId}`);
      setFeedback(allFeedback.filter((feedback) => feedback._id !== feedbackId)); // Update feedback list after deletion
      alert("Feedback deleted successfully!");
    } catch (error) {
      console.error("Error deleting Feedback.", error.message);
      alert("Error deleting feedback. Please try again.");
    }
  };


  const ComponentsRef = useRef();


  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    DocumentTitle: "Feedbacks",
    onafterprint: () => alert("Feedbacks report successfully downloaded"),
  });

  const filteredFeedback = allFeedback.filter((feedback) =>
    feedback.fbtitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
  const downloadPDF = () => {
    
    const doc = new jsPDF();
  
    
    doc.setFont("helvetica");
    doc.setFontSize(20);
    doc.setTextColor("#ffffff"); 
  
    
    doc.text("Feedbacks Report", doc.internal.pageSize.getWidth() / 2, 30, { align: "center" });
  
  
    doc.setFontSize(12);
    doc.setTextColor("#000000"); 
    filteredFeedback.forEach((feedback, index) => {
      const yPos = 50 + index * 50;
      doc.text(`Title: ${feedback.fbtitle}`, 20, yPos);
      doc.text(`Description: ${feedback.fbdescription}`, 20, yPos + 10);
      doc.text(`Rating: ${feedback.rating}`, 20, yPos + 20);
    });
  
    
    doc.save("feedbacks_report.pdf");
  };

  return (
    <div >
    <Navigation />
    <div className="admin-review-container" ref={ComponentsRef}>
      <h1 className="admin-review-title">All Feedback</h1>
      {/* Search input */}
      <input
        type="text"
        placeholder="Search feedback by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="admin-review-search"
      />
      {/* Feedback table */}
      <table className="admin-review-table">
        <thead>
          <tr>
            <th className="admin-review-table-header">Title</th>
            <th className="admin-review-table-header">Description</th>
            <th className="admin-review-table-header">Rating</th>
            <th className="admin-review-table-header">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredFeedback.map((feedback) => (
            <tr key={feedback._id} className="admin-review-table-row">
              <td className="admin-review-table-data">{feedback.fbtitle}</td>
              <td className="admin-review-table-data">{feedback.fbdescription}</td>
              <td className="admin-review-table-data"><StarRating rating={feedback.rating} /></td>
              <td className="admin-review-table-data">
                {/* Delete button for each feedback */}
                <DeleteuserReview feedbackId={feedback._id} onDeleteuserReview={() => handleDeleteuserReview(feedback._id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Download report button */}
      <div className="admin-review-buttons">
        <button className="admin-review-print-button" onClick={handlePrint}>Print Report</button>
        <button className="admin-review-download-button" onClick={downloadPDF}>Download PDF</button>
      </div>
    </div>
    </div>
  );
};

export default Admin;
