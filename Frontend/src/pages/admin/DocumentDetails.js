import React, { useState, useEffect } from "react";
import axios from "axios";

const DocumentDetails = ({ match }) => {
  const [documentDetails, setDocumentDetails] = useState({});
  const [updatedStatus, setUpdatedStatus] = useState("");

  useEffect(() => {
    const fetchDocumentDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/Vendor/${match.params.id}`
        );
        setDocumentDetails(response.data);
      } catch (error) {
        console.error("Error fetching Vendor details:", error);
      }
    };

    fetchDocumentDetails();
  }, [match.params.id]);

  const handleStatusUpdate = () => {
    // Update the status locally in the state
    setDocumentDetails((prevDetails) => ({
      ...prevDetails,
      status: updatedStatus,
    }));
  };

  return (
    <div>
      <h2>Document Details</h2>
      <div>
        <p>ID: {documentDetails.id}</p>
        <p>Name: {documentDetails.name}</p>
        <p>Status: {documentDetails.status}</p>
        {/* Add other document details here */}
      </div>
      <div>
        <label htmlFor="status">Update Status:</label>
        <select
          id="status"
          value={updatedStatus}
          onChange={(e) => setUpdatedStatus(e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
        <button onClick={handleStatusUpdate}>Update Status</button>
      </div>
    </div>
  );
};

export default DocumentDetails;
