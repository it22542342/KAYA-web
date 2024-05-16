import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { useReactToPrint } from "react-to-print";
import './GetAllLoans.css'; 
import Navigation from '../../pages/Navigation';

function AllLoans() {
    const [loans, setLoans] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/loan/")
            .then((res) => {
                setLoans(res.data);
            })
            .catch((err) => {
                alert(err.message);
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/loan/delete/${id}`)
            .then(() => {
                setLoans(loans.filter(loan => loan._id !== id));
                console.log("Loan deleted successfully");
            })
            .catch((err) => {
                console.error("Error deleting Loan:", err);
            });
    };

    const ComponentsRef = useRef()
    const handlePrint = useReactToPrint({

        content: () => ComponentsRef.current,
        DocumentTitle: "Loan Report",
        onafterprint: () => alert("Loan report successfully downloaded")

    });

    return (
        <div>
             <Navigation />
            <table className="loan-table">
                <thead className="thead-dark">
                    <tr>
                        <th>Employee Name</th>
                        <th>Department</th>
                        <th>Loan Amount</th>
                        <th>Interest Rate</th>
                        <th>Premium</th>
                        <th>Repayment Period</th>
                        <th>Terms & Conditions</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loans.map(loan => (
                        <tr key={loan._id}>
                            <td>{loan.Employee_Name}</td>
                            <td>{loan.Department}</td>
                            <td>Rs.{loan.Loan_Amount}</td>
                            <td>{loan.Interest_rate}%</td>
                            <td>Rs.{loan.Premium}</td>
                            <td>{loan.Repayment_period} months</td>
                            <td>{loan.Conditions}</td>
                            <td>
                                <Link to={`/updateloan/${loan._id}`} className="loanupdate" style={{ marginRight: '10px' }}>Update</Link>
                                <button onClick={() => handleDelete(loan._id)} className="loandelete">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="btn btn-primary custom-button-report mt-2" onClick={handlePrint}>Download Report</button>
        </div>
    );
}

export default AllLoans;
