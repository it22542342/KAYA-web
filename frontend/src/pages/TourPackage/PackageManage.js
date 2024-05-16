import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf'; // Import jsPDF for PDF generation
import Navigation from '../../pages/Navigation';
import './packageManage.css'; 

function TourPackageManagement() {
    const [packages, setPackages] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/packages")
            .then((res) => {
                setPackages(res.data);
            })
            .catch((err) => {
                console.error("Error fetching tour packages:", err);
                alert("Failed to fetch tour packages.");
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/packages/delete/${id}`)
            .then(() => {
                setPackages(packages.filter(pkg => pkg._id !== id));
                console.log("Tour package deleted successfully");
            })
            .catch((err) => {
                console.error("Error deleting tour package:", err);
                alert("Failed to delete tour package.");
            });
    };

    const downloadPDF = () => {
        // Generate PDF document with tour package details
        const doc = new jsPDF();
        const currentDate = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

        // Header
        doc.setFontSize(20);
        doc.text("Tour Package Details", 105, 20, null, null, "center");

        // Content
        doc.setFontSize(14);
        let y = 40;
        packages.forEach(pkg => {
            doc.text(`Package Name: ${pkg.package_name}`, 20, y);
            y += 10;
            doc.text(`Customer Name: ${pkg.customer_name}`, 20, y);
            y += 10;
            doc.text(`Customer NIC: ${pkg.customer_NIC}`, 20, y);
            y += 10;
            doc.text(`Phone Number: ${pkg.phone_number}`, 20, y);
            y += 10;
            doc.text(`Number of Persons: ${pkg.NOF_person}`, 20, y);
            y += 20;
        });

        // Footer
        doc.setFontSize(12);
        doc.text("Generated on: " + currentDate, 105, 280, null, null, "center");

        // Save PDF
        doc.save('tour_package_details.pdf');
    };

    return (
        <div>
            <Navigation />
            <div className="custom-container mt-3"></div>
            <div className="custom-container mt-5">
                <div></div>
                <h1 className="emph1" >Tour Packages</h1>
                <button onClick={downloadPDF} className="custom-button custom-button-primary" style={{ marginBottom: '10px' }}>Download Tour Package Details</button>
                <table className="custom-table custom-table-striped custom-table-bordered">
                    <thead className="custom-thead-dark">
                        <tr>
                            <th>Package Name</th>
                            <th>Customer Name</th>
                            <th>Customer NIC</th>
                            <th>Phone Number</th>
                            <th>Number of Persons</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {packages.map(pkg => (
                            <tr key={pkg._id}>
                                <td>{pkg.package_name}</td>
                                <td>{pkg.customer_name}</td>
                                <td>{pkg.customer_NIC}</td>
                                <td>{pkg.phone_number}</td>
                                <td>{pkg.NOF_person}</td>
                                <td>
                                    <Link to={`/updatePackage/${pkg._id}`} className="custom-button custom-button-primary" style={{ marginRight: '10px' }}>Update</Link>
                                    <button onClick={() => handleDelete(pkg._id)} className="custom-button custom-button-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TourPackageManagement;
