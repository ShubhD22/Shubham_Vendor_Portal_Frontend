import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const DocumentDetails = () => {
  const [vendorDetails, setVendorDetails] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchVendorDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/Vendor/${id}`
        );
        setVendorDetails(response.data);
      } catch (error) {
        console.error("Error fetching vendor details:", error);
      }
    };

    fetchVendorDetails();
  }, [id]);

  const openDocument = (path) => {
    window.open(path, "_blank");
  };

  return (
    <div className="container mx-auto my-8">
      {vendorDetails ? (
        <>
          <h1 className="text-2xl font-bold mb-4">Vendor Details</h1>
          <p>
            <strong>Vendor ID:</strong> {vendorDetails.id}
          </p>
          <p>
            <strong>Organization Name:</strong> {vendorDetails.organizationName}
          </p>
          <p>
            <strong>Name:</strong> {vendorDetails.name}
          </p>
          <p>
            <strong>Email:</strong> {vendorDetails.email}
          </p>
          <p>
            <strong>Phone Number:</strong> {vendorDetails.phoneNumber}
          </p>

          {/* Display documents in a table */}
          <h2 className="text-2xl font-bold mt-8 mb-4">Document Details</h2>
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                  Document
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {vendorDetails.vendorCategory &&
              vendorDetails.vendorCategory.documentList &&
              vendorDetails.documentVerified &&
              vendorDetails.documentPaths ? (
                vendorDetails.vendorCategory.documentList
                  .split("|")
                  .map((document, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                        {document}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                        {vendorDetails.documentVerified.split("|")[index] || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                        {vendorDetails.documentPaths.split("|")[index] ? (
                          <a
                            href="#"
                            onClick={() => openDocument(vendorDetails.documentPaths.split("|")[index])}
                            className="text-blue-500"
                          >
                            View
                          </a>
                        ) : (
                          "N/A"
                        )}
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center">
                    No documents available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      ) : (
        <p>Loading vendor details...</p>
      )}
    </div>
  );
};

export default DocumentDetails;
